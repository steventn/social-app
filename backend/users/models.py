from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    location = models.CharField(max_length=255)
    preferences = models.JSONField(null=True, blank=True)

class Player(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    location = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.user.username
