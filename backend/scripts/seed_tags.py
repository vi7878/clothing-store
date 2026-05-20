from shop.models import Tag


def seed_tags():
    tags = ["new", "summer"]
    for tag_name in tags:
        tag, created = Tag.objects.get_or_create(name=tag_name)
        if created:
            print(f"Created tag: {tag_name}")
        else:
            print(f"Tag already exists: {tag_name}")


if __name__ == "__main__":
    seed_tags()
