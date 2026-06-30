from rest_framework import serializers
from .models import (
    Category,
    Product,
    ProductImage,
    ProductVariant,
    Tag,
    Order,
    OrderItem,
    Address,
)
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    address = serializers.CharField(write_only=True, required=False, allow_blank=True)
    default_address = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "role",
            "address",
            "default_address",
        ]
        read_only_fields = ["id", "role", "default_address"]

    def get_default_address(self, obj):
        addr = obj.addresses.filter(is_default=True).first()
        return addr.delivery_address if addr else ""

    def update(self, instance, validated_data):
        address_text = validated_data.pop("address", None)
        instance = super().update(instance, validated_data)
        if address_text is not None:
            addr = instance.addresses.filter(is_default=True).first()
            if addr:
                if address_text.strip():
                    addr.delivery_address = address_text
                    addr.save()
                else:
                    addr.delete()
            elif address_text.strip():
                Address.objects.create(
                    user=instance, delivery_address=address_text, is_default=True
                )
        return instance


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "password", "first_name", "last_name"]

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Неправильний поточний пароль.")
        return value

    def validate_new_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError(
                "Пароль має містити щонайменше 6 символів."
            )
        return value


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "parent"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "image_type", "variant"]


class ProductVariantSerializer(serializers.ModelSerializer):
    size = serializers.ReadOnlyField(source="size.name")
    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductVariant
        fields = [
            "id",
            "size",
            "color_name",
            "color_hex",
            "stock_quantity",
            "sku",
            "image",
        ]

    def get_image(self, obj):
        img = obj.images.first()
        if img:
            return img.image.url
        return None


class OrderItemSerializer(serializers.ModelSerializer):
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "product_variant",
            "quantity",
            "price_at_purchase",
            "product_name",
            "size_name",
            "color_name",
            "product_image",
        ]
        read_only_fields = ["product_name", "size_name", "color_name", "product_image"]

    def get_product_image(self, obj):
        if obj.product_variant:
            # Спробуємо взяти фото варіанту, якщо немає - головне фото товару
            variant_img = obj.product_variant.images.first()
            if variant_img:
                return variant_img.image.url
            main_img = obj.product_variant.product.images.filter(
                image_type="main"
            ).first()
            if main_img:
                return main_img.image.url
        return None


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    order_items = serializers.ListField(
        child=serializers.DictField(), write_only=True, required=False
    )

    class Meta:
        model = Order
        fields = [
            "id",
            "status",
            "payment_method",
            "subtotal",
            "delivery_fee",
            "total_amount",
            "shipping_address",
            "created_at",
            "items",
            "order_items",
        ]

    def create(self, validated_data):
        items_data = validated_data.pop("order_items", [])
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            # Використовуємо product_variant_id, оскільки з фронтенду приходить ID (число)
            variant_id = item_data.get("product_variant")
            OrderItem.objects.create(
                order=order,
                product_variant_id=variant_id,
                quantity=item_data.get("quantity"),
                price_at_purchase=item_data.get("price_at_purchase"),
            )
        return order


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    category_name = serializers.ReadOnlyField(source="category.name")

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "sku",
            "description",
            "base_price",
            "has_discount",
            "discount_percent",
            "is_active",
            "average_rating",
            "gender",
            "tags",
            "category",
            "category_name",
            "images",
            "variants",
        ]
