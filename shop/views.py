from rest_framework import viewsets
from django.contrib.postgres.search import (
    SearchVector,
    SearchQuery,
    SearchRank,
    TrigramSimilarity,
)
from django.db.models import Q, Case, When, Value, IntegerField
from .models import Category, Product, Order
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    OrderSerializer,
    UserSerializer,
    RegisterSerializer,
    ChangePasswordSerializer,
    ResetPasswordWithCodeSerializer,
)
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.core.mail import send_mail
import random

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "user": UserSerializer(user).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        )


class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.object.set_password(serializer.validated_data.get("new_password"))
            self.object.save()
            return Response(
                {"message": "Пароль успішно змінено"}, status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetCodeView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        if not user.email:
            return Response({"error": "У користувача немає email"}, status=status.HTTP_400_BAD_REQUEST)

        # Generate 6-digit code
        code = str(random.randint(100000, 999999))
        
        try:
            # Save to cache for 15 minutes
            cache.set(f"pwd_reset_code_{user.id}", code, timeout=900)

            # Send email via Mailtrap
            send_mail(
                subject='Код підтвердження для зміни паролю',
                message=f'Ваш код підтвердження: {code}\nКод дійсний 15 хвилин.',
                from_email='noreply@wearhouse.com',
                recipient_list=[user.email],
                fail_silently=False,
            )
        except Exception as e:
            return Response({"error": "Помилка при відправці листа або збереженні коду. Можливо, пошта налаштована неправильно."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Код надіслано на вашу пошту"}, status=status.HTTP_200_OK)


class ResetPasswordWithCodeView(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ResetPasswordWithCodeSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            code = serializer.validated_data.get("code")
            cached_code = cache.get(f"pwd_reset_code_{self.object.id}")

            if not cached_code or str(cached_code) != str(code):
                return Response({"error": "Недійсний або прострочений код"}, status=status.HTTP_400_BAD_REQUEST)

            self.object.set_password(serializer.validated_data.get("new_password"))
            self.object.save()
            cache.delete(f"pwd_reset_code_{self.object.id}")

            return Response(
                {"message": "Пароль успішно змінено"}, status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        search_query = self.request.query_params.get("search")

        if search_query:
            query_text = search_query.lower()

            # Словник синонімів
            synonyms = {
                "men": ["він", "чоловік", "чоловічий"],
                "women": ["вона", "жінка", "жіночий"],
                "dress": ["сукня", "плаття"],
                "pants": ["штани", "легінси", "джогери"],
                "shirt": ["сорочка", "футболка"],
                "hoodie": ["худі", "світшот", "кофта"],
                "coat": ["пальто", "верхній одяг"],
                "jacket": ["куртка", "піджак"],
            }

            expanded_query = query_text
            for eng, ukr_list in synonyms.items():
                if eng in query_text:
                    expanded_query += " " + " ".join(ukr_list)

            # Повнотекстовий пошук за назвою, категорією, тегами та описом (без SKU)
            vector = (
                SearchVector("name", weight="A", config="simple")
                + SearchVector("category__name", weight="B", config="simple")
                + SearchVector("category__parent__name", weight="C", config="simple")
                + SearchVector("tags__name", weight="B", config="simple")
                + SearchVector("description", weight="D", config="simple")
            )

            query = SearchQuery(
                expanded_query, search_type="websearch", config="simple"
            )

            # Тріграмна схожість для тексту
            name_similarity = TrigramSimilarity("name", query_text)
            cat_similarity = TrigramSimilarity("category__name", query_text)

            # Пріоритет для SKU (чистий збіг цифр без fuzzy noise)
            queryset = (
                queryset.annotate(
                    rank=SearchRank(vector, query),
                    name_sim=name_similarity,
                    cat_sim=cat_similarity,
                    sku_priority=Case(
                        When(sku=query_text, then=Value(2)),  # Точний збіг
                        When(
                            sku__icontains=query_text, then=Value(1)
                        ),  # Частковий збіг
                        default=Value(0),
                        output_field=IntegerField(),
                    ),
                )
                .filter(
                    Q(rank__gte=0.01)
                    | Q(name_sim__gt=0.1)
                    | Q(cat_sim__gt=0.1)
                    | Q(sku_priority__gt=0)
                    | Q(name__icontains=query_text)
                    | Q(category__name__icontains=query_text)
                )
                .order_by("-sku_priority", "-rank", "-name_sim", "-cat_sim")
                .distinct()
            )

        return queryset

    filterset_fields = ["category", "gender", "tags__name"]


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
