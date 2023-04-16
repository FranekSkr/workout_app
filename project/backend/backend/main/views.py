from django.shortcuts import render, redirect, HttpResponse
from .models import Workout, Exercise

from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from datetime import date

from django.contrib import messages

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
        today_workout.exercises.append({"name":exercise_name, "weight":exercise_weight, "amount":exercise_amount})
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
