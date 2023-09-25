from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from django.core.serializers import serialize 
from django.shortcuts import render
from django.http import JsonResponse
import json

def user_login(request):
    if request.method == 'POST':
        # Process the request if posted data are available
        username = request.POST['username']
        password = request.POST['password']
        # Check username and password combination if correct
        user = authenticate(username=username, password=password)

        if user is not None:
            print(user)
            print (user is not None)
            # Save session as cookie to login the user
            # login(request, user)
            # Success, now let's login the user.
            # return render(request, 'home.html')
            # data = serialize("json", [obj], fields=('title', 'content'))
           
            request.session['person'] =  {'name':username}
            print(request.session.get('person')['name'])

            data = {
                    'success': True,
                    'data': username,
                }
                
            dump = json.dumps(data)
            print(dump)
            return HttpResponse(dump, content_type='application/json')
        else:
            # Incorrect credentials, let's throw an error to the screen.
                data = {
                    'success': False,
                    'data' : 'User tidak ditemukan'
                }
                dump = json.dumps(data)
                print(dump)
                return HttpResponse(dump, content_type='application/json')
    else:
        # No post data availabe, let's just show the page to the user.
        return render(request, 'index.html')
    
def user_logout(request):
     if request.method == 'GET':
        del request.session['person']
        data = {
                    'success': True,
                    'data': 'logout berhasil',
                }
                
        dump = json.dumps(data)
        print(dump)
        return HttpResponse(dump, content_type='application/json')
        # return render(request,'index.html')