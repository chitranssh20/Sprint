from django.shortcuts import render
from .models import User
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
# Create your views here.

class handleSignUp(APIView):
    def post(self, request):
        if request.method == 'POST':
            email = request.POST['email']
            user = User.objects.create_user(email)
            return Response({'status': 'created'})
        return request.data


