from django.contrib import admin
from django.urls import path
from .import views

urlpatterns = [
    path('signup/', views.handleSignUp.as_view(), name = 'handleSignUp'),
]