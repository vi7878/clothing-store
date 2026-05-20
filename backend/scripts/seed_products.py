import os
from django.core.files import File
from shop.models import Product, ProductImage, ProductVariant, Category, Tag, Size
from decimal import Decimal
import random


def seed_products():
    # 1. Отримуємо базові дані
    try:
        category_women = Category.objects.get(name="Жінки")
        category_men = Category.objects.get(name="Чоловіки")
        tag_new = Tag.objects.get(name="new")
        tag_summer = Tag.objects.get(name="summer")
        sizes = list(Size.objects.all())
    except Category.DoesNotExist:
        print("Error: Run seed_categories first!")
        return
    except (Tag.DoesNotExist, Size.DoesNotExist):
        print("Error: Run seed_tags and seed_sizes first!")
        return

    # Шлях до фото у фронтенді (всередині контейнера бекенду через волюм .)
    # У docker-compose . змонтовано в /app, тому шлях буде:
    assets_path = "/app/frontend/src/assets/products/"

    if not os.path.exists(assets_path):
        print(f"Error: Path {assets_path} not found!")
        return

    # Список файлів
    files = [
        f for f in os.listdir(assets_path) if f.endswith(".jpg") or f.endswith(".png")
    ]

    # Групуємо фото по товарах (наприклад 10_1m.jpg, 10_2m.jpg належать одному товару)
    product_map = {}
    for f in files:
        # Приклад імені: 10_1w.jpg -> ID=10, Type=1, Gender=w
        parts = f.replace(".jpg", "").replace(".png", "").split("_")
        if len(parts) < 2:
            continue

        prod_id = parts[0]
        suffix = parts[1]  # 1w, 2w, 1m, 2m

        if prod_id not in product_map:
            product_map[prod_id] = {
                "images": [],
                "gender": "women" if "w" in suffix else "men",
            }
        product_map[prod_id]["images"].append(f)

    print(f"Found {len(product_map)} potential products.")

    for prod_id, data in product_map.items():
        gender_code = data["gender"]
        cat = category_women if gender_code == "women" else category_men

        # Створюємо товар
        product, created = Product.objects.get_or_create(
            name=f"Товар #{prod_id} ({gender_code})",
            defaults={
                "category": cat,
                "base_price": Decimal(random.randint(500, 2000)),
                "description": f"Це автоматично згенерований опис для товару {prod_id}.",
                "gender": gender_code,
            },
        )

        if created:
            print(f"Created product: {product.name}")
            # Додаємо теги
            product.tags.add(tag_new if random.random() > 0.5 else tag_summer)

            # Створюємо хоча б один варіант (Size + Color), щоб можна було прив'язати фото кольору
            variant, _ = ProductVariant.objects.get_or_create(
                product=product,
                size=random.choice(sizes),
                color_name="Default Color",
                defaults={"stock_quantity": 10, "sku": f"SKU-{prod_id}-DEF"},
            )

            # Обробляємо фото
            for img_name in data["images"]:
                img_path = os.path.join(assets_path, img_name)

                # Визначаємо тип фото по назві (логіка на основі ваших файлів)
                # 1w/1m - main, 2w/2m - hover
                img_type = "main"
                if "2" in img_name:
                    img_type = "hover"
                elif "3" in img_name:
                    img_type = "color"

                with open(img_path, "rb") as f:
                    prod_img = ProductImage(
                        product=product,
                        image_type=img_type,
                        variant=variant if img_type == "color" else None,
                    )
                    # Django скопіює файл у media/products/
                    prod_img.image.save(img_name, File(f), save=True)
                    print(f"  Added {img_type} image: {img_name}")
        else:
            print(f"Product {prod_id} already exists.")


if __name__ == "__main__":
    seed_products()
