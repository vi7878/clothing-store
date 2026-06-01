#!/bin/sh

# Міграції
echo "Running migrations..."
python manage.py migrate

# Автоматичне наповнення бази даних
echo "Seeding database..."

echo "1. Seeding categories..."
python manage.py shell -c "from backend.scripts.seed_categories import seed_categories; seed_categories()"

echo "2. Seeding sizes..."
python manage.py shell -c "from backend.scripts.seed_sizes import seed_sizes; seed_sizes()"

echo "3. Seeding tags..."
python manage.py shell -c "from backend.scripts.seed_tags import seed_tags; seed_tags()"

echo "4. Seeding products from JS..."
python manage.py shell -c "from backend.scripts.seed_from_js import seed_from_js; seed_from_js()"

# Збираємо статику
echo "Collecting static files..."
python manage.py collectstatic --noinput
