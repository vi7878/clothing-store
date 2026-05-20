import os
import django
import random
import re
import shutil
from django.core.files import File
from shop.models import Product, ProductImage, ProductVariant, Category, Tag, Size, ProductTag
from decimal import Decimal

def seed_from_js():
    js_path = "/app/frontend/src/assets/products/"
    js_file_path = "/app/frontend/src/data/products.js"
    media_prod_path = "/app/media/products/"
    
    if not os.path.exists(js_file_path):
        print(f"Error: {js_file_path} not found!")
        return

    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    try:
        cat_women = Category.objects.get(name="Жінки")
        cat_men = Category.objects.get(name="Чоловіки")
        all_sizes = list(Size.objects.all().order_by('id'))
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
    product_blocks = re.findall(r'\{[\s\S]*?id: \d+[\s\S]*?\}', content)
    
    import_map = {}
    imports = re.findall(r"import (\w+) from '\.\.\/assets\/products\/(.*?)';", content)
    for var_name, file_name in imports:
        import_map[var_name] = file_name

    for block in product_blocks:
        id_match = re.search(r'id:\s*(\d+)', block)
        if not id_match: continue
        p_id = id_match.group(1)

        title_match = re.search(r'title:\s*["\'](.*?)["\']', block)
        title = title_match.group(1) if title_match else f"Product {p_id}"

        price_match = re.search(r'price:\s*(\d+)', block)
        price = price_match.group(1) if price_match else "1000"

        gender_match = re.search(r'gender:\s*[\'"](.*?)[\'"]', block)
        gender = gender_match.group(1) if gender_match else "unisex"
        
        # Tags
        tags = []
        tags_match = re.search(r'collections:\s*\[(.*?)\]', block)
        if tags_match:
            tags = [t.strip().strip("'").strip('"') for t in tags_match.group(1).split(',') if t.strip()]
        
        # Colors
        colors = []
        colors_match = re.search(r'colors:\s*\[(.*?)\]', block)
        if colors_match:
            colors = [c.strip().strip("'").strip('"') for c in colors_match.group(1).split(',') if c.strip()]
        
        # Images
        imgs = []
        imgs_match = re.search(r'images:\s*\[(.*?)\]', block)
        if imgs_match:
            imgs = [i.strip() for i in imgs_match.group(1).split(',') if i.strip()]

        # Створення
        cat = cat_women if gender == 'women' else cat_men
        product = Product.objects.create(
            name=title,
            category=cat,
            base_price=Decimal(price),
            gender=gender,
            description=f"Опис для {title}."
        )

        for t_name in tags:
            tag, _ = Tag.objects.get_or_create(name=t_name)
            ProductTag.objects.create(product=product, tag=tag)

        # 3 послідовні розміри
        if len(all_sizes) >= 3:
            idx = random.randint(0, len(all_sizes)-3)
            selected_sizes = all_sizes[idx:idx+3]
        else:
            selected_sizes = all_sizes

        for color_hex in colors:
            for size in selected_sizes:
                sku = f"W-{p_id}-{color_hex.replace('#', '')}-{size.name}"
                ProductVariant.objects.create(
                    product=product,
                    size=size,
                    color_name=f"Color {color_hex}",
                    color_hex=color_hex,
                    stock_quantity=random.randint(1, 100),
                    sku=sku
                )

        for i, img_var in enumerate(imgs):
            file_name = import_map.get(img_var)
            if not file_name: continue
            
            img_path = os.path.join(js_path, file_name)
            if os.path.exists(img_path):
                img_type = 'main' if i == 0 else ('hover' if i == 1 else 'gallery')
                with open(img_path, 'rb') as f:
                    pi = ProductImage(product=product, image_type=img_type)
                    pi.image.save(file_name, File(f), save=True)

        print(f"Synced: {title}")

if __name__ == "__main__":
    seed_from_js()
