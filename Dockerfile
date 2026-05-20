FROM python:3.14-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    netcat-openbsd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


FROM base AS development
COPY . .
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


FROM base AS production
COPY . .
ARG DJANGO_SECRET_KEY=dummy-for-build #змінити після налаштування бази даних
RUN DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY python manage.py collectstatic --noinput
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
