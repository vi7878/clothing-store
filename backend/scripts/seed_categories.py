from shop.models import Category

def seed_categories():
    structure = {
        "Жінки": ["Сукні", "Футболки та топи", "Джинси та штани", "Верхній одяг", "Светри"],
        "Чоловіки": ["Футболки та поло", "Худі та світшоти", "Джинси", "Верхній одяг", "Светри"],
        "Унісекс": ["Аксесуари", "Взуття"]
    }

    for parent_name, subcategories in structure.items():
        # Створюємо або отримуємо головну категорію
        parent_cat, created = Category.objects.get_or_create(name=parent_name)
        if created:
            print(f"Created parent category: {parent_name}")
        
        for sub_name in subcategories:
            # Створюємо підкатегорію, прив'язану до батьківської
            sub_cat, sub_created = Category.objects.get_or_create(
                name=sub_name, 
                parent=parent_cat
            )
            if sub_created:
                print(f"  Created subcategory: {sub_name} under {parent_name}")

if __name__ == "__main__":
    seed_categories()
    print("Categories seeding finished.")
