import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from shop.models import Product
p = Product.objects.first()
p.has_discount = True
p.discount_percent = 25
p.average_rating = 4.5
p.save()

from shop.serializers import ProductSerializer
print(ProductSerializer(p).data)
