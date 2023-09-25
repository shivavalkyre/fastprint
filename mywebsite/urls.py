"""
URL configuration for mywebsite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from . import views
from . import controllers_login
from . import controllers_api
from . import controllers_kategori
from . import controllers_status
from . import controllers_produk

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('',views.index),
    path('about/',views.about),
    path('home/',views.home),
    path('home/api_content',views.api_content),
    path('home/kategori/',views.kategori),
    path('home/status/',views.status),
    path('home/produk/',views.produk),

    # controller path
    path('main/loginapp',controllers_login.user_login),
    path('home/logout/',controllers_login.user_logout),
    # controller hit API
    path('home/api',controllers_api.read_api),

    # controller kategori
    path('home/kategori/create/',controllers_kategori.create),
    path('home/kategori/read/',controllers_kategori.read),
    path('home/kategori/read/all/',controllers_kategori.read_all),
    path('home/kategori/read/<str:nama_kategori>',controllers_kategori.readbynama_kategori),
    path('home/kategori/update/<int:id_kategori>',controllers_kategori.update),
    path('home/kategori/delete/',controllers_kategori.delete),
    path('home/kategori/delete/<int:id_kategori>',controllers_kategori.destroy),

    # controller status
    path('home/status/create/',controllers_status.create),
    path('home/status/read/',controllers_status.read),
    path('home/status/read/all/',controllers_status.read_all),
    path('home/status/read/<str:nama_status>',controllers_status.readbynama_status),
    path('home/status/update/<int:id_status>',controllers_status.update),
    path('home/status/delete/',controllers_status.delete),
    path('home/status/delete/<int:id_status>',controllers_status.destroy),

    # controller produk
    path('home/produk/create/',controllers_produk.create),
    path('home/produk/read/',controllers_produk.read),
    path('home/produk/update/<int:id_produk>',controllers_produk.update),
    path('home/produk/delete/',controllers_produk.delete),
    path('home/produk/delete/<int:id_produk>',controllers_produk.destroy),
]
