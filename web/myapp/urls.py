from django.urls import path
from .views import (
    RegisterView, 
    LoginView, 
    LogoutView, 
    ResetPasswordView, 
    PhotoUploadView, 
    UpdatePhotoView, 
    ChangePasswordView,
    CurrentUserView,
    GetUserByIdView,
    MyTokenObtainPairView
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('upload-photo/', PhotoUploadView.as_view(), name='upload'),
    path('update-photo/<int:pk>/', UpdatePhotoView.as_view(), name='update-photo'),
    path('current-user/', CurrentUserView.as_view(), name='current-user'),  
    path('get-user/<int:user_id>/', GetUserByIdView.as_view(), name='get-user-by-id'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]