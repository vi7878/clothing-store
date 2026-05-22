from shop.models import Category


def seed_categories():
    # Видаляємо всі старі категорії
    Category.objects.all().delete()
    print("Old categories deleted.")

    structure = {
        "Вона": {
            "Новинки": [],
            "Одяг": [
                "Сукні",
                "Футболки та топи",
                "Худі та світшоти",
                "Светри та кардигани",
                "Сорочки",
                "Штани та легінси",
                "Джинси",
                "Спідниці",
                "Шорти",
                "Верхній одяг",
            ],
            "Аксесуари": [],
            "Взуття": [],
        },
        "Він": {
            "Новинки": [],
            "Одяг": [
                "Футболки та поло",
                "Худі та світшоти",
                "Светри",
                "Сорочки",
                "Штани",
                "Джинси",
                "Шорти",
                "Верхній одяг",
            ],
            "Аксесуари": [],
            "Взуття": [],
        },
    }

    for parent_name, children in structure.items():
        # Створюємо головну категорію (Він/Вона)
        parent_cat = Category.objects.create(name=parent_name)
        print(f"Created top-level category: {parent_name}")

        if isinstance(children, dict):
            for sub_name, sub_subcategories in children.items():
                # Створюємо підкатегорію (наприклад, Одяг, Новинки)
                sub_cat = Category.objects.create(name=sub_name, parent=parent_cat)
                print(f"  Created subcategory: {sub_name} under {parent_name}")

                for ss_name in sub_subcategories:
                    # Створюємо під-підкатегорію (наприклад, Сукні під Одяг)
                    Category.objects.create(name=ss_name, parent=sub_cat)
                    print(f"    Created sub-subcategory: {ss_name} under {sub_name}")
        elif isinstance(children, list):
            for sub_name in children:
                Category.objects.create(name=sub_name, parent=parent_cat)
                print(f"  Created subcategory: {sub_name} under {parent_name}")


if __name__ == "__main__":
    seed_categories()
    print("Categories seeding finished.")
