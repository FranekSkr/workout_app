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
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self,email):
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exists")
        return email

    def create(self, validated_data):

        user = User.objects.create_user(**validated_data)
        return user