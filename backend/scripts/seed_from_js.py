import os
import random
import re
import shutil
from django.core.files import File
from shop.models import (
    Product,
    ProductImage,
    ProductVariant,
    Category,
    Tag,
    Size,
    ProductTag,
)
from decimal import Decimal


def seed_from_js():
    js_path = "/app/frontend/src/assets/products/"
    js_file_path = "/app/frontend/src/data/products.js"
    media_prod_path = "/app/media/products/"

    if not os.path.exists(js_file_path):
        print(f"Error: {js_file_path} not found!")
        return

    with open(js_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    try:
        all_sizes = list(Size.objects.all().order_by("id"))
    except Category.DoesNotExist:
        print("Error: Run seed_categories first.")
        return

    # 1. Очищення бази даних
    Product.objects.all().delete()

    # 2. Очищення фізичних файлів у media, щоб уникнути суфіксів у назвах
    if os.path.exists(media_prod_path):
        shutil.rmtree(media_prod_path)
    os.makedirs(media_prod_path, exist_ok=True)

    print("Old products and media files deleted. Starting clean seed...")

    # Покращений regex для витягування блоків об'єктів
    product_blocks = re.findall(r"\{\s*id: \d+[\s\S]*?\n\s{2}\},", content)

    import_map = {}
    # Підтримка як одинарних, так і подвійних лапок в імпортах
    imports = re.findall(
        r"import\s+(\w+)\s+from\s+['\"](?:\.\.\/)+assets\/products\/(.*?)['\"];",
        content,
    )
    for var_name, file_name in imports:
        import_map[var_name] = file_name

    # Мапінг категорій з JS у БД
    cat_map = {
        "Tracksuits": "Спортивні штани з лампасами",  # Тимчасово, краще додати таку категорію
        "Pants": "Штани",
        "Pants & Leggings": "Штани та легінси",
        "Shorts": "Шорти",
        "Socks": "Базові сірі шкарпетки",  # Теж краще додати категорію Шкарпетки
        "T-shirts & Polos": "Футболки та поло",
        "T-shirts & Tank Tops": "Футболки та топи",
        "Shirts": "Сорочки",
        "Blouses & Shirts": "Сорочки",
        "Sweaters": "Светри",
        "Sweaters & Cardigans": "Светри та кардигани",
        "Beachwear": "Одяг",
        "Suits & Blazers": "Одяг",
        "Jackets & Vests": "Верхній одяг",
        "Coats": "Верхній одяг",
        "Outerwear": "Верхній одяг",
        "Hoodies & Sweatshirts": "Худі та світшоти",
        "Sets": "Одяг",
        "Co-ords": "Одяг",
        "Jumpsuits": "Одяг",
        "Jeans": "Джинси",
        "Dresses": "Сукні",
        "Skirts": "Спідниці",
    }

    for block in product_blocks:
        id_match = re.search(r"id:\s*(\d+)", block)
        if not id_match:
            continue
        p_id = id_match.group(1)

        title_match = re.search(r'name:\s*["\'](.*?)["\']', block)
        title = title_match.group(1) if title_match else f"Product {p_id}"

        description_match = re.search(r'description:\s*["\']([\s\S]*?)["\']', block)
        description = (
            description_match.group(1).strip()
            if description_match
            else f"Опис для {title}."
        )

        price_match = re.search(r"price:\s*(\d+)", block)
        price = price_match.group(1) if price_match else "1000"

        gender_match = re.search(r'gender:\s*[\'"](.*?)[\'"]', block)
        gender = gender_match.group(1) if gender_match else "unisex"

        category_match = re.search(r'category:\s*["\'](.*?)["\']', block)
        js_category = category_match.group(1) if category_match else "Clothing"

        # Tags
        tags = []
        tags_match = re.search(r"collections:\s*\[(.*?)\]", block)
        if tags_match:
            tags = [
                t.strip().strip("'").strip('"')
                for t in tags_match.group(1).split(",")
                if t.strip()
            ]

        # Colors
        colors = []
        color_matches = re.findall(r'hex:\s*["\'](#[0-9a-fA-F]{3,6})["\']', block)
        if color_matches:
            colors = list(set(color_matches))

        # Images
        imgs = []
        imgs_match = re.search(r"images:\s*\[(.*?)\]", block)
        if imgs_match:
            imgs = [i.strip() for i in imgs_match.group(1).split(",") if i.strip()]

        # Створення / Пошук категорії
        parent_name = "Вона" if gender == "women" else "Він"
        target_cat_name = cat_map.get(js_category, "Одяг")

        try:
            # Шукаємо категорію з правильним батьком
            cat = Category.objects.get(
                name=target_cat_name, parent__parent__name=parent_name
            )
        except Category.DoesNotExist:
            try:
                cat = Category.objects.get(
                    name=target_cat_name, parent__name=parent_name
                )
            except Category.DoesNotExist:
                cat = Category.objects.get(name=parent_name)

        product = Product.objects.create(
            id=int(p_id),
            name=title,
            category=cat,
            base_price=Decimal(price),
            gender=gender,
            description=description,
        )

        for t_name in tags:
            tag, _ = Tag.objects.get_or_create(name=t_name)
            ProductTag.objects.create(product=product, tag=tag)

        # Розміри
        size_match = re.search(r"\[\s*[\"'](XXS|XS|S|M|L|XL|XXL)[\"']", block)
        if size_match:
            size_array_match = re.search(
                r"\[\s*((?:[\"'](?:XXS|XS|S|M|L|XL|XXL)[\"']\s*,?\s*)+)\]", block
            )
            if size_array_match:
                size_names = re.findall(
                    r"[\"'](XXS|XS|S|M|L|XL|XXL)[\"']", size_array_match.group(1)
                )
                selected_sizes = [s for s in all_sizes if s.name in size_names]
            else:
                selected_sizes = all_sizes[:3]
        else:
            selected_sizes = all_sizes[:3]

        if not colors:
            colors = ["#FFFFFF"]

        for color_hex in colors:
            for size in selected_sizes:
                sku = f"{random.randint(10000, 99999)}"
                while ProductVariant.objects.filter(sku=sku).exists():
                    sku = f"{random.randint(10000, 99999)}"

                ProductVariant.objects.create(
                    product=product,
                    size=size,
                    color_name=f"Color {color_hex}",
                    color_hex=color_hex,
                    stock_quantity=random.randint(10, 50),
                    sku=sku,
                )

        for i, img_var in enumerate(imgs):
            file_name = import_map.get(img_var)
            if not file_name:
                continue

            img_path = os.path.join(js_path, file_name)
            if os.path.exists(img_path):
                img_type = "main" if i == 0 else ("hover" if i == 1 else "gallery")
                with open(img_path, "rb") as f:
                    pi = ProductImage(product=product, image_type=img_type)
                    pi.image.save(file_name, File(f), save=True)

        print(f"Synced: {title}")


if __name__ == "__main__":
    seed_from_js()
