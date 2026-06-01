#!/bin/sh

# Чекаємо базу даних
echo "Waiting for postgres..."
while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 0.1
done
echo "PostgreSQL started"

# Виконання міграцій та сідінгу
/app/backend/scripts/setup_db.sh

# Запуск сервера
echo "Starting server..."
exec python manage.py runserver 0.0.0.0:8000
