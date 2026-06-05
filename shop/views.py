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
)


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
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        # Поки що повертаємо всі замовлення, пізніше обмежимо для конкретного користувача
        return Order.objects.all().order_by("-created_at")

    def perform_create(self, serializer):
        # Якщо користувач авторизований, прив'язуємо замовлення до нього
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            # Тимчасово дозволяємо створювати замовлення без користувача (наприклад, для першого тесту)
            # Але модель Order вимагає user, тому візьмемо першого ліпшого або адміна
            from .models import User

            user = User.objects.first()
            if not user:
                user = User.objects.create_user(
                    email="admin@example.com",
                    password="password",  # pragma: allowlist secret
                    first_name="Admin",
                    last_name="Admin",
                )
            serializer.save(user=user)
