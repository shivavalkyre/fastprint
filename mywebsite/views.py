from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
# from . import controllers_login

# method view
def index2(request):
    return HttpResponse("Hallo Dunia")

def index(request):
    # controllers_login.user_login
    return render(request,'index.html')

def home(request):
    if 'person' not in request.session:
        # return HttpResponseRedirect('')
        return render (request,'index.html')
    else:
        return render (request,'home.html')

def api_content(request):
    return render (request,'api_content.html')

def kategori(request):
    return render (request,'kategori.html')

def status(request):
    return render (request,'status.html')

def produk(request):
    return render (request,'produk.html')
    
# method view
def about(request):
    return HttpResponse("About")