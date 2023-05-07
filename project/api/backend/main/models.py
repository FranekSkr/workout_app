from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Exercise(models.Model):
    name = models.CharField(max_length=150, null=False, blank=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class WorkoutSet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    weight = models.FloatField(blank=False, null=False)
    reps = models.IntegerField(blank=False, null=False)
    rest = models.IntegerField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.exercise.name
    
class WorkoutPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, unique=True)
    weekday = models.IntegerField(blank=False, null=False, unique=True)
    exerices = models.CharField(max_length=100, blank=False, null=False,unique=True)

    def __str__(self):
        return f"{self.user}'s workout plan"
