from django.urls import path
from .views import UserRegistrationView, LoginView

urlpatterns = [
    path('signup/', UserRegistrationView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
]