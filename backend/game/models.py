from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class Game(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_games")
    participants = models.ManyToManyField(User, related_name="participated_games", blank=True)

    def __str__(self):
        return f"{self.title} on {self.date} at {self.time}"
