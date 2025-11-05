from django.db import models
from users.models import CustomUser

class ChatRoom(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    created_by_user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='created_chatrooms')

    def __str__(self):
        return f"ChatRoom {self.pk}"

class ChatMessage(models.Model):
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    sender_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_chat_messages')
    message_content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['sent_at']

    def __str__(self):
        return f"Msg {self.pk} by {self.sender_user.username}"