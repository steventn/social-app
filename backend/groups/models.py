from django.db import models
from users.models import CustomUser


class Group(models.Model):
    group_name = models.CharField(max_length=255)
    description = models.CharField(max_length=500, blank=True, null=True)  # Added max_length
    created_by_user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='owned_groups')
    chat_room = models.OneToOneField('chat.ChatRoom', on_delete=models.CASCADE)

    def __str__(self):
        return self.group_name


class GroupMember(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='memberships')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='group_memberships')
    join_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('group', 'user')
        verbose_name = "Group Member"
        verbose_name_plural = "Group Members"

    def __str__(self):
        return f"{self.user.username} in {self.group.group_name}"