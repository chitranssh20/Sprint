# from ast import Delete
from math import prod
from os import stat
from pickle import FALSE
from urllib import response
from django.shortcuts import render
from rest_framework.views import APIView 
from .models import NewUser, Product 
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from .serializers import getProductSerializer, getStaffSerializer, getUserSerializer
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

# User APIs

# Get staff 
class GetStaff(APIView):
    def get(self, request):
        if request.method == 'GET':
            users = NewUser.objects.filter(is_staff = True)

            serializer = getStaffSerializer(users, many = True)
            return Response({'message': serializer.data, 'status': status.HTTP_200_OK})
        else:
            return Response({'message': 'Please use a get method', 'status': status.HTTP_400_BAD_REQUEST})
# Add staff 
class AddStaff(APIView):
    def post(self, request):
        if request.method == 'POST':
            email = request.POST['email']
            password = request.POST['password']
            fname = request.POST['fname']
            lname = request.POST['lname']

            if NewUser.objects.filter(email = email).exists():
                return Response({'message': 'This user already exists', 'status': status.HTTP_208_ALREADY_REPORTED }) 
            else:
                user = NewUser.objects.create_staff(email = email, password = password, fname = fname, lname = lname)
                print(user.fname)
                # user.save()
                return Response({'message': 'STaff Member has been added', 'status': status.HTTP_201_CREATED})

# Remove Staff  
class RemoveStaff(APIView):
    def delete(self, request):
        if request.method == 'DELETE':
            email = request.POST['email']
            if NewUser.objects.filter(email = email).exists():
                staff = NewUser.objects.get(email = email)
                staff.delete() 
                return Response({'message': 'Staff Memeber has been deleted', 'status': status.HTTP_200_OK })
            else:
                return Response({'message': 'No staff with this name exists', 'status': status.HTTP_404_NOT_FOUND})
        else:
            return Response({'message': 'Use delete method', 'status': status.HTTP_400_BAD_REQUEST })

# Sign Up Api
class handleSignUp(APIView):
    def post(self, request):
        if request.method == 'POST':
            email = request.POST['email'] 
            password = request.POST['password']
            fname = request.POST['fname']
           

            if NewUser.objects.filter(email=email).exists():
                return Response({'message': 'Email already exists', 'status': status.HTTP_208_ALREADY_REPORTED }) 
            else:
                user = NewUser.objects.create_user(email = email, password = password, fname = fname)
                
                return Response({'message': 'You have signed up', 'status': status.HTTP_201_CREATED})
        else:
            return Response({'messgae': 'Please use post method', 'status': status.HTTP_400_BAD_REQUEST})
            
# login api
class LogIn(APIView):
    def post(self, request):
        if request.method == 'POST':
            email = request.POST['email']
            password = request.POST['password']

            if not NewUser.objects.filter(email = email).exists():
                return Response({'message': 'Please sign up first', 'status': status.HTTP_404_NOT_FOUND})
            else:
                user = authenticate(email = email, password = password)
                if user is not None:
                    login(request, user)
                    response = Response({'message': 'User Logged In', 'fname': user.fname,'staff': user.is_staff, 'superuser': user.is_superuser,  'status': status.HTTP_202_ACCEPTED}) 
                    return response
                else:
                    return Response({'message': 'You have entered wrong password', 'status': status.HTTP_406_NOT_ACCEPTABLE })

        else:
            return Response({'message': 'Please use post method', 'status': status.HTTP_400_BAD_REQUEST })
# logout api 
class LogOut(APIView):
    # permission_classes = [IsAuthenticated]
    def post(self, request):
        # name = request.COOKIES['fname']
        # print(name)
        email = request.POST['email']
        password = request.POST['password']
        print(email)
        if NewUser.objects.filter(email = email).exists():
            user = authenticate(email = email, password = password)

            login(request, user)
            print(request.user)
            print(request.user.is_authenticated)
        if(request.user.is_authenticated):

            print('checking again after logout')
            print(request.user.is_authenticated)
            logout(request)
            print('checking again after logout')
            print(request.user.is_authenticated)
            return Response({'User not yet logged out'})
        
        else:
            print(request.user.is_authenticated)
            return Response({'user logged out'})
        

    # print(5+5)
    
# change password 
class changePassword(APIView):
    def post(self, request):
        if request.method == 'POST':
            password = request.POST['passwoord']
            newpassword = request.POST['newpassword']
            # user.set_password(newpassword)
            return Response({'Password has been updated'})
        else:
            return Response({'Password could not be updated'})


# Product APIs

#Get Product
class getProduct(APIView) :
    def get(self, request):
        if request.method == 'GET':
            product = Product.objects.all()
            serializer = getProductSerializer(product, many= True)
          
            return JsonResponse({'products': serializer.data, 'status': status.HTTP_202_ACCEPTED})
        else:
            return Response({'An error occured'})

# Get Product By Id 
class getProductDetail(APIView):
    def get(self, request, prodId):
        if request.method == 'GET':
            product = Product.objects.get(prodId = prodId)
            serializer = getProductSerializer(product, many = False)
            return Response({'product': serializer.data, 'message': "Product has been fetched" })
        else:
            return Response({'An Error Occured'})


# Add Product 
class addProduct(APIView):
    def post(self, request):
        if request.method == 'POST':

            name = request.POST['name']
            prodImg = request.FILES['prodImg']
            desc = request.POST['desc']
            price = request.POST['price']
            category = request.POST['category']

            product = Product(name = name, prodImg = prodImg, desc = desc, price = price, category = category)
            product.save()

            return Response({'Product has been added'})
        else:
            return Response({'Coudl not add Product'})
        
        
# delete product 
class deleteProduct(APIView):
    def delete(self, request, prodId):
        if request.method == 'DELETE':
            # prodId = request.POST.get('prodId')
            print(prodId)
            print(request.POST)

            if Product.objects.filter(pk=prodId).exists():

                product = Product.objects.get(pk = prodId)
                print(product)
                product.delete()

                return Response({'message': 'Product has been deleted','status': status.HTTP_200_OK })
            else:
                return Response({'message': 'Product not found', 'status': status.HTTP_404_NOT_FOUND })
        else:
            return Response({'No Product exists'})

# update product 
class getUpdateProduct(APIView):
    def get(self, request, prodId):
        if request.method == 'GET':
            if Product.objects.filter(prodId = prodId).exists():
                product = Product.objects.get(prodId = prodId)
                print(product)
                serializer = getProductSerializer(product, many=False)
                return Response({'Product': serializer.data, 'status': status.HTTP_200_OK})
            else:
                return Response({'message': 'Product not found', 'status': status.HTTP_404_NOT_FOUND})
        else:
            return Response({'messgae': 'Use Get Method', 'status': status.HTTP_400_BAD_REQUEST})


class updateProduct(APIView):

    def put(self, request):
        if request.method == 'PUT':
            prodId = request.POST['prodId']
            if Product.objects.filter(pk = prodId).exists():
                product = Product.objects.get(pk = prodId)
                print(product)
                product.name = request.POST['name']
                product.prodImg = request.FILES['prodImg']
                product.desc = request.POST['desc']
                product.price = request.POST['price']
                product.category = request.POST['category']
                product.save()
                print(product)
                    
                return Response({ 'message': 'Product has been updated', 'status': status.HTTP_200_OK })  
            else:
                return Response({'message': 'Product not found', 'status': status.HTTP_404_NOT_FOUND })

            # return Response({'Not found'}) 

class Blacklist(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist() 
            return Response("Succesfful")
        except Exception as e:
            return Response(status.HTTP_400_BAD_REQUEST)
# These APIs will be made after creating frontend 
# Order APIs 
# Stats APIs 



