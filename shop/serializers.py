from rest_framework import serializers
from .models import Category, Product, ProductImage, ProductVariant, Tag


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

    class Meta:
        model = ProductVariant
        fields = ["id", "size", "color_name", "color_hex", "stock_quantity", "sku"]


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
