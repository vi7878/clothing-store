from django.db import migrations
from django.contrib.postgres.operations import TrigramExtension, BtreeGinExtension


class Migration(migrations.Migration):
    dependencies = [
        ("shop", "0007_update_skus_to_numeric"),
    ]

    operations = [
        TrigramExtension(),
        BtreeGinExtension(),
    ]
