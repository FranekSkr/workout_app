from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('login/', views.login_user, name="login"),
    path('client-panel/', views.clientPanel, name="client-panel"),
    path('logout/', views.logout_user, name='logout')
]
