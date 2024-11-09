# chat/models.py
from django.db import models
from django.contrib.auth import get_user_model

class ChatRoom(models.Model):
    name = models.CharField(max_length=255)
    participants = models.ManyToManyField(get_user_model(), related_name='chat_rooms')

    def __str__(self):
        return self.name

class Message(models.Model):
    room = models.ForeignKey('ChatRoom', related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender.username}: {self.content[:20]}'