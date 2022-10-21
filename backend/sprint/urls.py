from django.contrib import admin
from django.urls import path, include
from .views import deleteProduct, handleSignUp, LogIn, LogOut, addProduct, deleteProduct, updateProduct, getProduct, getUpdateProduct, AddStaff, GetStaff, RemoveStaff, Blacklist, getProductDetail, Search


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('addStaff/', AddStaff.as_view()),
    path('removeStaff/', RemoveStaff.as_view()),
    path('getStaff/', GetStaff.as_view()),
    path('signup/', handleSignUp.as_view()),
    path('login/', LogIn.as_view()),
    path('logout/', LogOut.as_view()),
    path('getProduct/', getProduct.as_view()),
    path('addProduct/', addProduct.as_view()),
    path('deleteProduct/<int:prodId>', deleteProduct.as_view()),
    path('productDetail/<int:prodId>', getProductDetail.as_view()),
    path('updateProduct/', updateProduct.as_view()),
    path('getUpdateProduct/<int:prodId>', getUpdateProduct.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path('logout/blacklist/',  Blacklist.as_view(), name= "Blacklist" ),
    path('peek/', Search.as_view(), name='SearchProducts')
 

]