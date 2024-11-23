# groups/models.py
from django.db import models
from users.models import CustomUser

class Group(models.Model):
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(CustomUser, related_name="custom_groups")