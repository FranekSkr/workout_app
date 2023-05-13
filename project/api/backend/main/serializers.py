from rest_framework.serializers import ModelSerializer
from .models import Exercise,  WorkoutPlan, WorkoutSet
from django.contrib.auth.models import User
from rest_framework import serializers


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
    

class WorkoutPlanSerializer(ModelSerializer):

    class Meta:
        model = WorkoutPlan
        fields = "__all__"


class WorkoutSetSerializer(ModelSerializer):

    class Meta:
        model = WorkoutSet
        fields = ['pk', 'user', 'exercise', 'weight', 'reps', 'date']
        read_only = ['pk']
        # write_only_fields = ['user']

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
    