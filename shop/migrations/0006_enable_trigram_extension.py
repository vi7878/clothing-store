from django.db import migrations
from django.contrib.postgres.operations import TrigramExtension, BtreeGinExtension

class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_remove_product_collection'),
    ]

    operations = [
        TrigramExtension(),
        BtreeGinExtension(),
    ]
