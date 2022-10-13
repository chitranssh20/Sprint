from asyncio.windows_events import NULL
from curses.ascii import NUL
from distutils.command.upload import upload
from email.policy import default
from pyexpat import model
from tkinter import CASCADE
from xml.dom import ValidationErr
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import MaxValueValidator
from django.utils.timezone import now 
# Create your models here.

class UserManager(BaseUserManager):

    def create_user(self, email, password, **other_fields):
        if not email:
            raise ValueError('Email must be provided') 
        if not password:
            raise ValueError('Password must be provided') 
        email = self.normalize_email(email)
        user = self.model(email = email, **other_fields)
        user.set_password(password)
        user.save()

        return user 
    
    def create_staff(self, email, password,fname, lname, **other_fields):
        user = self.create_user(email, password)
        user.fname =  fname 
        user.lname = lname 
        user.is_staff = True 
        user.is_superuser = False 
        user.is_active = True 

        if user.is_staff is not True:
            raise ValueError('is_staff must be true')
        
        user.save()
        print(user)
        return user 

    def create_superuser(self, email, password, **other_fields):
        user = self.create_user(email, password) 
        user.is_staff = True 
        user.is_superuser = True 
        user.is_active = True 

        if user.is_staff is not True:
            raise ValueError('is_staff must be true')
        
        if user.is_superuser is not True:
            raise ValueError('is_superuser must be true') 

        user.save()
        print(user)
        return user

        # return user 

class NewUser(AbstractBaseUser, PermissionsMixin):
    email  = models.EmailField(unique=True)
    fname = models.CharField(max_length=20)
    lname = models.CharField(max_length=20)
    otp = models.IntegerField(default= 0, validators=[MaxValueValidator(100000)])
    phone = models.IntegerField(default=0 , validators=[MaxValueValidator(10000000000)])
    address = models.CharField(default='', max_length=60)
    city = models.CharField(default='', max_length=20)
    state = models.CharField(default='', max_length=20)
    is_staff = models.BooleanField(default=False)
    is_active: models.BooleanField(default=True)


    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS= []

def __str__(self):
    return self.email 

    


class Product(models.Model):
    prodId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=60)
    prodImg= models.ImageField(upload_to= 'media', null= True, default= '' )
    desc = models.CharField(max_length=400)
    ratings = models.FloatField(validators=[MaxValueValidator(5.0)], default=0)
    price = models.IntegerField(validators=[MaxValueValidator(10000)])
    category = models.CharField(max_length=50)
    viewTD = models.IntegerField(default=0)
    viewMonth = models.IntegerField(default=0)
    viewWeek = models.IntegerField(default=0)
    viewToday = models.IntegerField(default=0)
    soldTD = models.IntegerField(default=0)
    soldMonth = models.IntegerField(default=0)
    soldWeek = models.IntegerField(default=0)
    soldToday = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.name 



class Order(models.Model):
    orderId = models.AutoField(primary_key=True) 
    orderEmail = models.EmailField(max_length=20)
    cart = models.JSONField()
    orderAdd = models.CharField(default='', max_length=60)
    Ordercity = models.CharField(default='', max_length=20)
    Orderstate = models.CharField(default='', max_length=20)
    Orderphone = models.IntegerField(default=0 , validators=[MaxValueValidator(10000000000)])
    Orderprice = models.IntegerField(validators=[MaxValueValidator(10000)])
    Orderotp = models.IntegerField(default= 0, validators=[MaxValueValidator(100000)])
    OrderStatus = models.IntegerField(validators=[MaxValueValidator(2)])
    orderDate = models.DateTimeField(auto_now_add=True)
    orderDevice = models.CharField(max_length=10)

    def __str__(self) -> str:
        return self.orderEmail

class Review(models.Model):
    reviewId = models.AutoField(primary_key=True)
    comment = models.CharField(max_length=300)
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    timezone = models.DateTimeField(default = now)



 

