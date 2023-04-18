from django.shortcuts import render, redirect, HttpResponse

from .models import Workout, Exercise
from .serializers import WorkoutSerializer, ExerciseSerializer, UserSerializer

from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages


# api
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status


from datetime import date


def index(request, *args, **kwargs):
    return render(request, 'index.html')


def register_user(request, *args, **kwargs):
    if request.user.is_authenticated:
        return redirect("/client-panel")
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        password2 = request.POST["password_confirmation"]

        user = authenticate(request, username=username, password=password)
        if user is None:
            if password == password2:
                try:
                    User.objects.get(email=email)
                    messages.add_message(request, messages.ERROR, "Ten adres email jest już zajęty")
                except:
                    User.objects.create_user(
                        username=username,
                        email=email,
                        password=password
                    )
            else:
                messages.add_message(request, messages.ERROR, "Podane hasła różnią się")
        else:
            messages.add_message(request, messages.ERROR, "Nazwa, uyżytkownika jest już zajęta")

    return render(request, "register.html")


def login_user(request, *args, **kwargs):
    user = request.user
    if user.is_authenticated:
        return redirect("client-panel")

    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            print(f"successfully logged user: {user}")
            return redirect('client-panel')
        else:
            messages.error(request, "Podano błędne dane logowania")

    return render(request, 'login.html')


def logout_user(request):
    logout(request)
    return redirect("/")


@login_required(login_url="login")
def clientPanel(request, *args, **kwargs):
    user = User.objects.get(username=request.user.username)
    exercises = Exercise.objects.filter(user=user)
    workouts = Workout.objects.filter(user=user)

    try:
        today_workout = Workout.objects.get(date=date.today(), user=user)
    except:
        Workout.objects.create(
            user=user
        )
        workouts = Workout.objects.filter(user=user)
        today_workout = workouts.get(date=date.today())

    if request.method == "POST":
        exercise_name = request.POST["exercise_name"]
        exercise_weight = request.POST["exercise_weight"]
        exercise_amount = request.POST["exercise_amount"]

        try:
            Exercise.objects.get(user=user, name=exercise_name)
        except:
            Exercise.objects.create(
                user=user,
                name=exercise_name
            )
        today_workout.exercises.append({"name": exercise_name, "weight": exercise_weight, "amount": exercise_amount})
        today_workout.save()
        return redirect("/client-panel")

    context = {
        "date": date.today(),
        "exercises": exercises,
        "workouts": workouts,
        'today_workout': today_workout,
        "today_exercises": today_workout.exercises
    }

    return render(request, 'client-panel.html', context)


# api
class EndpointsView(APIView):

    def get(self, request):
        data = {
            "api/": "Endpoints list",
            "api/token": "Authentication token and refresh token",
            "api/token/refresh": "Paste refresh token to get new tokens",
            "api/client-panel/": "All data about logged user"
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
            "status" "200"
            "added": {"name": exercise_name, "weight": exercise_weight, "amount": exercise_amount}
        }

        return Response(data)

class WorkoutListApiView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        workouts = Workout.objects.filter(user=user)
        serialized_workouts = WorkoutSerializer(workouts, many=True).data

        data = {
            f"user {user} workouts":serialized_workouts
        }

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
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RegisterUserView(APIView):
    def post(self, request):
        username = request.POST.get('username', False)
        email = request.POST.get('email', False)
        password = request.POST.get("password", False)
        password2 = request.POST.get("password_confirmation", False)

        user = authenticate(request, username=username, password=password)
        if user is None:
            if password == password2:
                try:
                    User.objects.get(email=email)
                    return Response({"error": "Adres email jest już zajęty"})
                except:
                    user = User.objects.create_user(
                        username=username,
                        email=email,
                    )
                    user.set_password(password)
                    user.save()
            else:
                return Response({"error": "Podane hasła różnią się"})
        else:
            return Response({"error":"Nazwa, użytkownika jest już zajęta"})

        return Response({"message":f"Pomyślnie zarejestrowano użytkownika {username}"})
