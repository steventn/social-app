from django.urls import path
from .views import (UserRegistrationView, LoginView,
                    UserProfileView, AddPlayerByUserIdView, CheckFriendsView)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('add-player/', AddPlayerByUserIdView.as_view(), name='add-player'),
    path('get-friends/', CheckFriendsView.as_view(), name='get-friends'),
]
