from django.shortcuts import render, redirect, HttpResponse

from .models import Exercise, WorkoutSet, WorkoutPlan
from .serializers import  ExerciseSerializer, UserSerializer, WorkoutSetSerializer, WorkoutPlanSerializer

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

def docs(request):
    return render(request, "docs.html")


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

        today_workout = WorkoutSet.objects.filter(user=user, date=date.today())
        if today_workout:
            today_workout = WorkoutSetSerializer(today_workout, many=True).data
        else:
            return Response({"status": "200", "message": "No workout today"})
        


        user = UserSerializer(user, many=False).data

        data = {
            "today_workout": today_workout,
        }
        return Response(data)

    def post(self, request):
        user = request.user
        exercise_name = request.POST.get("name", None)
        exercise_weight = request.POST.get("weight")
        exercise_reps = request.POST.get("reps")
        exercise_rest = request.POST.get("rest", 0)
        
        if exercise_name is None:
            return Response({"status": "400", "message": "provide exercise name"})
        if exercise_weight is None:
            return Response({"status": "400", "message": "provide exercise weight"})
        try:
            exercise = Exercise.objects.get(name=exercise_name, user=user)
        except:
            exercise = Exercise.objects.create(
                name=exercise_name,
                user=user
            )
            exercise = Exercise.objects.get(name=exercise_name, user=user)
        data = {
            "user": user.pk,
            "exercise": exercise.pk,
            "weight": exercise_weight,
            "reps": exercise_reps,
            "rest": exercise_rest,
        }
        serializer = WorkoutSetSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


    def delete(self, request, index):

        workout_set = WorkoutSet.objects.get(pk=index, user =request.user) or None
        if workout_set is not None:
            
                workout_set.delete()
                return Response({"message": "usunięto ćwiczenie"})
        

        return Response({"status": "400", "message": "nie ma takiego ćwiczenia"})
    
class GetExerciseView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, index):
        
        exercises = Exercise.objects.filter(pk=index)
        serialized_exercises = ExerciseSerializer(exercises, many=True).data

        return Response(serialized_exercises)    


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

