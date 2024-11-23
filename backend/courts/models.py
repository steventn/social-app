from django.db import models

class Court(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    availability = models.JSONField(null=True, blank=True)  # Ex: {"Monday": "2-4pm"}
