#!/bin/sh

# Чекаємо базу даних
echo "Waiting for postgres..."
while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 0.1
done
echo "PostgreSQL started"

# Міграції
python manage.py migrate

# Збираємо статику
python manage.py collectstatic --noinput

# Автоматичне наповнення, якщо база порожня
echo "Checking if database seeding is needed..."
python manage.py shell -c "from shop.models import Product; import sys; sys.path.append('/app/backend/scripts'); from seed_from_js import seed_from_js;
if Product.objects.count() == 0:
    print('Database is empty. Starting auto-seed...');
    seed_from_js();
else:
    print('Database already contains data. Skipping seed.');
"

# Запуск сервера
exec python manage.py runserver 0.0.0.0:8000
