from django.shortcuts import render, redirect
from .models import Workout, Exercise

from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from datetime import date


def index(request, *args, **kwargs):

    return render(request, 'index.html')


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
            pass

    return render(request, 'login.html')

def logout_user(request):
    logout(request)
    return redirect("/")


@login_required(login_url="login")
def clientPanel(request, *args, **kwargs):

    user = User.objects.get(username=request.user.username)
    exercises = Exercise.objects.all()
    workouts = Workout.objects.filter(user=user)
    try:
        today_workout = Workout.objects.get(date=date.today(), user=user)
    except:
        Workout.objects.create(
            user=user
        )
        workouts = Workout.objects.filter(user=user)
        today_workout = workouts.get(date=date.today())

    context = {
        "date": date.today(),
        "exercises": exercises,
        "workouts": workouts,
        'today_workout': today_workout
    }

    return render(request, 'client-panel.html', context)
