from django.shortcuts import render, redirect, HttpResponse

from .models import Workout, Exercise
from .serializers import WorkoutSerializer, ExerciseSerializer, UserSerializer

from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages


# api
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.views import APIView


from datetime import date


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# api
class EndpointsView(APIView):

    def get(self, request):
        data = {
            "api/": "Endpoints list",
            "api/register": "use POST method to register user. Fields to register: username, email, password, password_confirmation",
            "api/token": "Authentication token and refresh token. Credentials needed username, password",
            "api/token/refresh": "Paste refresh token to get new tokens",
            "api/client-panel/": "Data about authenticated user, and his today workout",

        }
        return Response(data)

class ClientPanel(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        exercises = Exercise.objects.filter(user=user)
        serialized_exercises = ExerciseSerializer(exercises, many=True).data

        try:
            today_workout = Workout.objects.get(date=date.today(), user=user)
        except:
            Workout.objects.create(
                user=user
            )
            workouts = Workout.objects.filter(user=user)
            today_workout = workouts.get(date=date.today())
        today_workout = WorkoutSerializer(today_workout, many=False).data

        user = UserSerializer(user, many=False).data

        data = {
            "profile": user,
            "exercises": serialized_exercises,
            "today_workout": today_workout,

        }
        return Response(data)

    def post(self, request):
        user = request.user

        try:
            today_workout = Workout.objects.get(date=date.today(), user=user)
        except:
            Workout.objects.create(
                user=user
            )
            workouts = Workout.objects.filter(user=user)
            today_workout = workouts.get(date=date.today())

        exercise_name = request.POST.get("exercise_name", False)
        exercise_weight = request.POST.get("exercise_weight", False)
        exercise_amount = request.POST.get("exercise_amount", False)

        try:
            Exercise.objects.get(user=user, name=exercise_name)
        except:
            Exercise.objects.create(
                user=user,
                name=exercise_name
            )
        today_workout.exercises.append({"name": exercise_name, "weight": exercise_weight, "amount": exercise_amount})
        today_workout.save()

        data = {
            "status": "200",
            "added": {"name": exercise_name, "weight": exercise_weight, "amount": exercise_amount}
        }

        return Response(data)

    def delete(self, request, index):

        user = request.user

        try:
            today_workout = Workout.objects.get(date=date.today(), user=user)
        except:
            Workout.objects.create(
                user=user
            )
            workouts = Workout.objects.filter(user=user)
            today_workout = workouts.get(date=date.today())
        today_workout.exercises.pop(index)
        today_workout.save()

        return Response({"message": "usunięto ćwiczenie"})

class WorkoutListApiView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        workouts = Workout.objects.filter(user=user)
        serialized_workouts = WorkoutSerializer(workouts, many=True).data

        data = {
            f"user {user} workouts":serialized_workouts
        }
        date = request.GET.get("date") or None
        if date is not None:
            workout = Workout.objects.get(user=user, date=date)
            return Response(WorkoutSerializer(workout).data)

        return Response(data)
class SpecificWorkoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        date = request.GET.get('date')
        workout = Workout.objects.get(user=user, date=date)
        return Response(WorkoutSerializer(workout).data)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        try:
            refresh_token = request.POST.get("refresh_token")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print("invalid request token")
            return Response(status=status.HTTP_400_BAD_REQUEST)



class RegisterUserView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

