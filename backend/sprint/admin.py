from django.contrib import admin
from .models import NewUser, Product , Order, Review 
# Register your models here.
admin.site.register(NewUser)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Review)