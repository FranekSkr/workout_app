from django.contrib import admin

from .models import Exercise, WorkoutSet, WorkoutPlan

# Register your models here.
admin.site.register(Exercise)
admin.site.register(WorkoutSet)
admin.site.register(WorkoutPlan)

