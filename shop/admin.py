from django.contrib import admin
from .models import User, Category, Product, ProductImage, ProductVariant, Order, OrderItem, Size, Tag, ProductTag

class ProductTagInline(admin.TabularInline):
    model = ProductTag
    extra = 1
    fields = ('tag', 'expiry_date')

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image', 'image_type', 'variant')

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1
    fields = ('size', 'color_name', 'color_hex', 'stock_quantity', 'sku')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'display_category', 'gender', 'base_price', 'has_discount', 'is_active')
    list_filter = ('category', 'gender', 'is_active', 'tags')
    search_fields = ('name', 'description')
    inlines = [ProductImageInline, ProductVariantInline, ProductTagInline]

    def display_category(self, obj):
        if obj.category.parent:
            return f"{obj.category.parent.name} > {obj.category.name}"
        return obj.category.name
    display_category.short_description = 'Категорія'

    class Media:
        js = ('admin/js/product_discount.js',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent_path')
    search_fields = ('name',)

    def parent_path(self, obj):
        if obj.parent:
            return obj.parent.name
        return "-"
    parent_path.short_description = 'Батьківська категорія'

@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(ProductTag)
class ProductTagAdmin(admin.ModelAdmin):
    list_display = ('product', 'tag', 'added_at', 'expiry_date')
    list_filter = ('tag', 'expiry_date')
    search_fields = ('product__name', 'tag__name')

class ProductVariantAdmin(admin.ModelAdmin): # Keeping class if needed, but removing registration
    list_display = ('product', 'size', 'color_name', 'stock_quantity', 'sku')
    list_filter = ('size', 'color_name')
    search_fields = ('product__name', 'sku')

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'role', 'is_staff')
    list_filter = ('role', 'is_staff')

admin.site.register(Order)
admin.site.register(OrderItem)
