from rest_framework.serializers import ModelSerializer
from .models import Exercise, Workout
from django.contrib.auth.models import User
from rest_framework import serializers

class WorkoutSerializer(ModelSerializer):
    class Meta:
        model = Workout
        fields = ["date", "user", "exercises"]

class ExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = ["user", "name"]

class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
