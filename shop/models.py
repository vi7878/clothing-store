from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from datetime import timedelta
from decimal import Decimal


class UserRole(models.TextChoices):
    CUSTOMER = "customer", _("Customer")
    ADMIN = "admin", _("Admin")
    MANAGER = "manager", _("Manager")


class OrderStatus(models.TextChoices):
    PENDING = "pending", _("Pending")
    PAID = "paid", _("Paid")
    SHIPPED = "shipped", _("Shipped")
    DELIVERED = "delivered", _("Delivered")
    CANCELLED = "cancelled", _("Cancelled")


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_("The Email field must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", UserRole.ADMIN)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    role = models.CharField(max_length=20, choices=UserRole, default=UserRole.CUSTOMER)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]


class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="subcategories",
    )

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Size(models.Model):
    name = models.CharField(max_length=20, unique=True)  # XXS, XS, S, M, L, XL, XXL

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="products"
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)

    # Discount fields
    has_discount = models.BooleanField(default=False)
    discount_percent = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )

    is_active = models.BooleanField(default=True)
    average_rating = models.DecimalField(
        max_digits=3, decimal_places=2, default=Decimal("0.00")
    )
    created_at = models.DateTimeField(auto_now_add=True)

    gender = models.CharField(
        max_length=20,
        choices=[("men", "Men"), ("women", "Women"), ("unisex", "Unisex")],
        default="unisex",
    )
    tags = models.ManyToManyField(
        Tag, through="ProductTag", blank=True, related_name="products"
    )

    def __str__(self):
        return self.name


class ProductTag(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateTimeField(
        null=True, blank=True, help_text="Залиште пустим для тегу 'new' (авто-14 днів)"
    )

    def save(self, *args, **kwargs):
        if not self.expiry_date and self.tag.name.lower() == "new":
            self.expiry_date = timezone.now() + timedelta(days=14)
        super().save(*args, **kwargs)

    def is_expired(self):
        if self.expiry_date and timezone.now() > self.expiry_date:
            return True
        return False


class ProductVariant(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="variants"
    )
    size = models.ForeignKey(Size, on_delete=models.PROTECT, related_name="variants")
    color_name = models.CharField(max_length=50)
    color_hex = models.CharField(max_length=7, blank=True)
    stock_quantity = models.IntegerField(default=0)
    sku = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"{self.product.name} - {self.size.name} - {self.color_name}"


class ProductImage(models.Model):
    IMAGE_TYPES = [
        ("main", "Головне фото"),
        ("hover", "Фото при наведенні"),
        ("color", "Фото кольору"),
        ("gallery", "Галерея"),
    ]
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )
    variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="images",
        help_text="Виберіть варіант, якщо це фото конкретного кольору",
    )
    image = models.ImageField(upload_to="products/")
    image_type = models.CharField(max_length=10, choices=IMAGE_TYPES, default="gallery")


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cart")
    updated_at = models.DateTimeField(auto_now=True)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    status = models.CharField(
        max_length=20, choices=OrderStatus, default=OrderStatus.PENDING
    )
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product_variant = models.ForeignKey(
        ProductVariant, on_delete=models.SET_NULL, null=True
    )
    quantity = models.PositiveIntegerField()
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="reviews"
    )
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="wishlist")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "product")
