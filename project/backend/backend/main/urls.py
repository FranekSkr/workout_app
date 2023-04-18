from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('', views.index),
    path('login/', views.login_user, name="login"),
    path('client-panel/', views.clientPanel, name="client-panel"),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('register/', views.register_user, name='register'),
    path("api/client-panel/", views.ClientPanel.as_view()),
    path("api/token/", jwt_views.TokenObtainPairView.as_view(), name="token"),
    path("api/token/refresh", jwt_views.TokenRefreshView.as_view(), name="token"),
    path("api/workout-list/", views.WorkoutListApiView.as_view()),
    path("api/", views.EndpointsView.as_view()),
    path("api/workout", views.SpecificWorkoutView.as_view())

]
