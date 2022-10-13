from dataclasses import field
from itertools import product
from rest_framework import serializers
from .models import Product, NewUser
class getProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product 
        fields = "__all__" 

class getStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser 
        fields = ['email', 'fname', 'lname'] 

class getUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser 
        fields =  ['email', 'fname', 'lname'] 
