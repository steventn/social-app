from django.urls import path
from .views import GameListAPIView, CreateGameAPIView

urlpatterns = [
    path('', GameListAPIView.as_view(), name='game-list'),
    path('create/', CreateGameAPIView.as_view(), name='create-game'),
]
