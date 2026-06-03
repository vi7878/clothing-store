# Modern Clothing Shop

Сучасна та функціональна платформа для онлайн-магазину одягу, побудована на потужному бекенді Django та швидкому фронтенді React. Проєкт пропонує безшовний досвід покупок з продуманою архітектурою та сучасним дизайном.

---

## Галерея (Visuals)

1.  **Головна сторінка:**
<img width="1920" height="913" alt="image" src="https://github.com/user-attachments/assets/81922718-3779-40f2-a7ff-5213fb886be2" />


2.  **Каталог та Фільтрація:**
<img width="1920" height="913" alt="image" src="https://github.com/user-attachments/assets/128ae1be-a186-4ab4-afc9-1da31f92b592" />


3.  **Картка товару та SKU:**
*Очікую на імплементацію SKU*

4.  **Кошик та Обране:**
<img width="1920" height="913" alt="image" src="https://github.com/user-attachments/assets/a4135cee-1392-4a6d-8c2b-ea1d5a88545e" />
<img width="1920" height="913" alt="image" src="https://github.com/user-attachments/assets/ff744cc7-458c-4400-a7c1-5ea5801c31d1" />



---

## Основні можливості

*   **Повний цикл покупок:** Від перегляду каталогу до керування кошиком та замовленнями.
*   **Розумний пошук та фільтрація:** Зручна навігація за категоріями, статтю, тегами та ціною.
*   **Автоматична генерація SKU:** Унікальна система артикулів для товарів та їх варіантів (розмір + колір).
*   **Швидкий інтерфейс:** Побудовано на React 19 з використанням Vite для миттєвого відгуку.
*   **Сучасний дизайн:** Адаптивна верстка за допомогою Tailwind CSS.
*   **Надійна архітектура:** Django REST Framework для API та PostgreSQL для зберігання даних.
*   **Повна контейнеризація:** Швидкий запуск через Docker Compose.

---

##  Технологічний стек

**Backend:**
*   **Framework:** Django 6.0 + Django REST Framework
*   **Database:** PostgreSQL
*   **Task Queue:** Celery + Redis
*   **Storage:** Pillow (обробка зображень)

**Frontend:**
*   **Library:** React 19
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Components:** React Icons, Swiper (слайдери), React Hot Toast

**Infrastructure:**
*   **Server:** Nginx (реверс-проксі та статика)
*   **Containerization:** Docker & Docker Compose
*   **Automation:** Makefile

---

##  Встановлення та запуск

### 1. Попередні вимоги
*   Встановлений **Docker** та **Docker Compose**.
*   Утиліта **make** (бажано).

### 2. Налаштування середовища
Скопіюйте приклад файлу оточення та налаштуйте його під себе (за замовчуванням підходить для локального запуску):
```bash
cp .env.example .env
```

### 3. Запуск проєкту
Використовуйте Makefile для швидкого старту:
```bash
make up
```
Це запустить базу даних, бекенд, фронтенд та Nginx.

### 4. Налаштування бази даних
Виконайте міграції та завантажте початкові дані (категорії, розміри, теги, товари):
```bash
make migrate
```
### 5. Доступ до застосунку
*   **Frontend:** `http://localhost`
*   **Backend API:** `http://localhost/api/`
*   **Admin Panel:** `http://localhost/admin/`

---

##  Корисні команди (Makefile)

*   `make up` — запуск усіх сервісів у фоновому режимі.
*   `make down` — зупинка сервісів.
*   `make migrate` — застосування міграцій.
*   `make logs` — перегляд логів бекенду.
*   `make shell` — доступ до Django shell всередині контейнера.

---

##  Розробка

Проєкт використовує `pre-commit` хуки для підтримки якості коду (Ruff для Python, ESLint для JS).
Щоб встановити хуки локально:
```bash
pre-commit install
```

---
