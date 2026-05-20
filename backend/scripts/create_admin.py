from shop.models import User
import sys

email = "admin@wearhouse.com"
password = "adminpassword"  # pragma: allowlist secret

try:
    if not User.objects.filter(email=email).exists():
        User.objects.create_superuser(
            email=email, password=password, first_name="Admin", last_name="Account"
        )
        print(f"Superuser {email} created successfully.")
    else:
        user = User.objects.get(email=email)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print(f"Superuser {email} already existed, password updated.")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
