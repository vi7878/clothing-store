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
        print(f"Error: {js_file_path} not found at {js_file_path}")
        return

    with open(js_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Створюємо базові розміри
    size_names_list = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]
    for sn in size_names_list:
        Size.objects.get_or_create(name=sn)

    all_sizes_map = {s.name: s for s in Size.objects.all()}

    # Очищення бази (тільки якщо запускаємо свіжий сід)
    print(f"Starting seeding from {js_file_path}...")

    # Мапінг кольорів
    color_map = {
        "#000000": "чорний",
        "#FFFFFF": "білий",
        "#808080": "сірий",
        "#1E3A8A": "темно-синій",
        "#D5B895": "бежевий",
        "#8B4513": "коричневий",
        "#4B5320": "оливковий",
        "#DC2626": "червоний",
        "#722F37": "бордо",
        "#E79E9E": "рожевий",
        "#93C5FD": "блакитний",
        "#EAB308": "гірчичний",
        "#3E7B9D": "синій",
        "#008080": "бірюзовий",
        "#6B21A8": "фіолетовий",
        "#B7410E": "теракотовий",
        "#047857": "смарагдовий",
        "#C19A6B": "карамельний",
    }

    # Знаходимо блоки товарів за допомогою Regex (більш надійно)
    # Шукаємо об'єкти, що починаються з { id: і мають закриваючу дужку },
    product_blocks = re.findall(r"\{\s*id:\s*\d+[\s\S]*?\n\s{2}\},", content)

    if not product_blocks:
        # Спробуємо інший варіант відступів
        product_blocks = re.findall(r"\{\s*id:\s*\d+[\s\S]*?\n\s{4}\},", content)

    print(f"Found {len(product_blocks)} product blocks in JS file.")

    import_map = {}
    imports = re.findall(
        r"import\s+(\w+)\s+from\s+['\"](?:\.\.\/)+assets\/products\/(.*?)['\"];",
        content,
    )
    for var_name, file_name in imports:
        import_map[var_name] = file_name

    cat_map = {
        "Tracksuits": "Спортивні штани з лампасами",
        "Pants": "Штани",
        "Pants & Leggings": "Штани та легінси",
        "Shorts": "Шорти",
        "Socks": "Базові сірі шкарпетки",
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

    # Видаляємо старі товари ТІЛЬКИ якщо знайшли нові блоки
    if product_blocks:
        Product.objects.all().delete()
        if os.path.exists(media_prod_path):
            shutil.rmtree(media_prod_path)
        os.makedirs(media_prod_path, exist_ok=True)
    else:
        print("No product blocks found, skipping deletion.")
        return

    count = 0
    for block in product_blocks:
        id_match = re.search(r"id:\s*(\d+)", block)
        if not id_match:
            continue
        p_id = int(id_match.group(1))

        title_match = re.search(r'name:\s*["\'](.*?)["\']', block)
        title = title_match.group(1) if title_match else f"Product {p_id}"

        price_match = re.search(r"price:\s*(\d+)", block)
        price = price_match.group(1) if price_match else "1000"

        gender_match = re.search(r'gender:\s*[\'"](.*?)[\'"]', block)
        gender = gender_match.group(1) if gender_match else "unisex"

        category_match = re.search(r'category:\s*["\'](.*?)["\']', block)
        js_category = category_match.group(1) if category_match else "Clothing"

        # Tags (Collections)
        tags = []
        tags_match = re.search(r"collections:\s*\[(.*?)\]", block, re.DOTALL)
        if tags_match:
            tags = [
                t.strip().strip("'").strip('"').lower()
                for t in tags_match.group(1).split(",")
                if t.strip()
            ]

        # Створення продукту
        parent_name = "Вона" if gender == "women" else "Він"
        target_cat_name = cat_map.get(js_category, "Одяг")
        try:
            cat = Category.objects.get(
                name=target_cat_name, parent__parent__name=parent_name
            )
        except Category.DoesNotExist:
            try:
                cat = Category.objects.get(
                    name=target_cat_name, parent__name=parent_name
                )
            except Category.DoesNotExist:
                cat, _ = Category.objects.get_or_create(name=parent_name)

        product = Product.objects.create(
            id=p_id,
            name=title,
            category=cat,
            base_price=Decimal(price),
            gender=gender,
            description=title,
        )

        for t_name in tags:
            tag, _ = Tag.objects.get_or_create(name=t_name)
            ProductTag.objects.create(product=product, tag=tag)

        # Варіанти
        extracted_variants = []
        gen_match = re.search(
            r"generateVariants\s*\(\s*\[(.*?)\]\s*,\s*\[(.*?)\]", block, re.DOTALL
        )
        if gen_match:
            s_part = gen_match.group(1)
            c_part = gen_match.group(2)
            v_sizes = [
                s.strip().strip("'").strip('"') for s in s_part.split(",") if s.strip()
            ]
            v_colors = re.findall(r"hex:\s*['\"](#[0-9a-fA-F]{3,6})['\"]", c_part)
            for c_hex in v_colors:
                for s_name in v_sizes:
                    extracted_variants.append({"size": s_name, "hex": c_hex})

        manual_vars = re.findall(
            r"size:\s*['\"](.*?)['\"]\s*,\s*[\s\S]*?color_hex:\s*['\"](#[0-9a-fA-F]{3,6})['\"]",
            block,
        )
        for s_name, c_hex in manual_vars:
            if not any(
                v["size"] == s_name and v["hex"].lower() == c_hex.lower()
                for v in extracted_variants
            ):
                extracted_variants.append({"size": s_name, "hex": c_hex})

        if not extracted_variants:
            for s_name in ["S", "M", "L"]:
                extracted_variants.append({"size": s_name, "hex": "#FFFFFF"})

        for v in extracted_variants:
            size_obj = all_sizes_map.get(v["size"])
            if not size_obj:
                continue
            c_hex = v["hex"]
            c_name = color_map.get(c_hex.upper(), f"Колір {c_hex}")
            ProductVariant.objects.create(
                product=product,
                size=size_obj,
                color_name=c_name,
                color_hex=c_hex,
                stock_quantity=random.randint(10, 50),
            )

        # Фото
        img_vars_match = re.search(r"images:\s*\[(.*?)\]", block, re.DOTALL)
        if img_vars_match:
            imgs = [i.strip() for i in img_vars_match.group(1).split(",") if i.strip()]
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

        count += 1

    print(f"Successfully synced {count} products with categories and variants.")


if __name__ == "__main__":
    seed_from_js()
