from shop.models import Size


def seed_sizes():
    standard_sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]
    for size_name in standard_sizes:
        size, created = Size.objects.get_or_create(name=size_name)
        if created:
            print(f"Created size: {size_name}")
        else:
            print(f"Size already exists: {size_name}")


if __name__ == "__main__":
    seed_sizes()
