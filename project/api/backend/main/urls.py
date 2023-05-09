from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/docs/', views.docs, name='docs'),
    path('api/logout/', views.LogoutView.as_view(), name='logout'),
    path("api/client-panel/<int:index>/", views.ClientPanel.as_view()),
    path("api/client-panel/", views.ClientPanel.as_view()),
    path('api/register/', views.RegisterUserView.as_view()),
    path("api/token/", views.MyTokenObtainPairView.as_view(), name="token"),
    path("api/token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token"),
    path("api/", views.EndpointsView.as_view()),
    path("api/get-exercise/<int:index>/", views.GetExerciseView.as_view(), name="get-exercise"),

]
