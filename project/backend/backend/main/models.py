from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Exercise(models.Model):
    name = models.CharField(max_length=150, null=False, blank=False, unique=True)

    def __str__(self):
        return self.name

class Workout(models.Model):
    date = models.DateField(auto_now_add=True, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercises = models.JSONField(default='')

    def __str__(self):
        return f"{self.user}'s workout - {self.date}"
