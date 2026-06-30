from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    ProductViewSet,
    OrderViewSet,
    RegisterView,
    ProfileView,
    ChangePasswordView,
    RequestPasswordResetCodeView,
    ResetPasswordWithCodeView,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r"categories", CategoryViewSet)
router.register(r"products", ProductViewSet, basename="product")
router.register(r"orders", OrderViewSet, basename="order")

urlpatterns = [
    path("", include(router.urls)),
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", TokenObtainPairView.as_view(), name="login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/profile/", ProfileView.as_view(), name="profile"),
    path("auth/password/", ChangePasswordView.as_view(), name="change_password"),
    path("auth/password/code/", RequestPasswordResetCodeView.as_view(), name="password_code"),
    path("auth/password/reset/", ResetPasswordWithCodeView.as_view(), name="password_reset"),
]
