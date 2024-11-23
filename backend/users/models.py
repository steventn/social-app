from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    location = models.CharField(max_length=255)
    preferences = models.JSONField(null=True, blank=True)
