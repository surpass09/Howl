from django.urls import path
from .views import create_user, create_profile, valid_user

urlpatterns = [
    path('api/create-user/', create_user, name='create_user'),
    path('api/create-profile/', create_profile, name='create_profile'),
    path('api/validate-user/', valid_user, name='validate_user')  # Corrected here
]
