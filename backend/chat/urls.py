# chat/urls.py
from django.urls import path
from .views import ChatRoomListView, MessageView, CreateChatRoomView

urlpatterns = [
    path('rooms/', ChatRoomListView.as_view(), name='chat_rooms'),
    path('messages/<int:room_id>/', MessageView.as_view(), name='chat_messages'),
    path('rooms/create/', CreateChatRoomView.as_view(), name='create_chat_room'),

]