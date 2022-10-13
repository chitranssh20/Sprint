from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import MaxValueValidator
from django.conf import settings


# Create your models here.
class CustomAccountManager(BaseUserManager):
    def create_user(self, email, password, **other_fields):
        if not email:
            raise ValueError('Users must have an email')
        if not password:
            raise ValueError('Users must have a password')
        email = self.normalize_email(email)
        user = self.model(email=email, password=password, **other_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password, **other_fields):
        # other_fields.setdefault('is_staff', True)
        # other_fields.setdefault('is_active', True)
        # other_fields.setdefault('is_superuser', True)
        #
        # if other_fields.get('is_staff') is not True:
        #     raise ValueError('Superuser must be assigned to is_staff = True')
        # if other_fields.get('is_superuser') is not True:
        #     raise ValueError('Superuser must be assigned to is_superuser = True')
        # return self.create_user(email, password, **other_fields)
        user = self.create_user(email=email, password=password)
        print(user)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        print(user.is_superuser)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=100, unique=True)
    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    otp = models.IntegerField(validators=[MaxValueValidator(100000)], default=0)
    phone = models.IntegerField(validators=[MaxValueValidator(10000000000)], null=True)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    pincode = models.IntegerField(validators=[MaxValueValidator(1000000)], null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomAccountManager()

    def __str__(self):
        return self.email


class Product(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    img = models.ImageField(null=False, blank=False)
    desc = models.CharField(max_length=1000)
    ratings = models.FloatField(max_length=5)
    price = models.IntegerField(validators=[MaxValueValidator(100000)])
    category = models.CharField(max_length=50)
    viewTillDate = models.IntegerField(default=0)
    viewThisMonth = models.IntegerField(default=0)
    viewThisWeek = models.IntegerField(default=0)
    viewToday = models.IntegerField(default=0)
    soldTillDate = models.IntegerField(default=0)
    soldThisMonth = models.IntegerField(default=0)
    soldThisWeek = models.IntegerField(default=0)
    soldToday = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Order(models.Model):
    orderId = models.IntegerField(primary_key=True)
    customerEmail = models.EmailField(max_length=100)
    customerPhone = models.IntegerField(validators=[MaxValueValidator(10000000000)])
    customerAddress = models.CharField(max_length=200)
    customerCity = models.CharField(max_length=50)
    customerState = models.CharField(max_length=50)
    orderPrice = models.IntegerField(default=0)
    cart = models.JSONField(null=False, blank=False)
    orderStatus = models.IntegerField(validators=[MaxValueValidator(1)], default=0)
    Device = models.CharField(max_length=15)
    orderDate = models.DateTimeField(auto_created=True)

    def __str__(self):
        return self.orderId


class Review(models.Model):
    reviewprod = models.ForeignKey(Product, on_delete=models.CASCADE)
    comment = models.JSONField(null=True)

    def __str__(self):
        return self.reviewprod
