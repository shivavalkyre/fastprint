from django.http import HttpResponse
# from django.core.serializers import serialize 
from django.shortcuts import render
from django.http import JsonResponse
from datetime import date
from requests_toolbelt.multipart.encoder import MultipartEncoder
import json
import hashlib
import requests
from datetime import datetime

def read_api(request):
     
          
          today = date.today()
          print(today)

          year = today.year
          new_year = str(year)
          new_year = new_year[2:4]
          print('new year '+ new_year)
          month = today.month

          if month <10:
               new_month = str(month).zfill(2) 
               print('new month '+ new_month)

          day = today.day

          if day <10:
                new_day = str(day).zfill(2)  
                print('new day ' + new_day)
          else:
                 new_day = str(day)
                 print('new day ' + new_day)

          
         
            #   bisacoding-23-09-23
          time_now = datetime.now()
          current_time = time_now.strftime("%H:%M:%S")
          print ('current time ' + current_time)
          times =  time_now.hour
          minute = time_now.minute
          print('minute',minute)
          print(times)
          # t_int = int(times)
          # print('time1 '+ t_int)

          if times<23:
                 times2 = times + 1
                 print('times2:')
                 print(times2)
                 
                 if times2<10:
                       times2 = str(times2).zfill(2) 
                       print(times2)
                 else:
                       times2 = str(times2)
                       print(times2)
                       
                      
          else:
                 times2 = '00'
                 day = day + 1
                 
                 if day < 10:
                    new_day = str(day).zfill(2)
                    print('new day ' + new_day)
                 else:
                    new_day = str(day) 
                    print('new day ' + new_day)

          
          if minute>55:
                times2 = times + 2
                print(times2)

          # 230923C14
          username = str('tesprogrammer' + new_day + new_month + new_year + 'C' + str(times2))
          password = 'bisacoding-' + new_day +'-' + new_month + '-' + new_year
          print('password '+ password)

          result = hashlib.md5(password.encode())
          md5_password = result.hexdigest()
          print('result '+ md5_password)



          data = str(today)
          data = {
                  "success": True,
                  "data": data,
          }
          
          data = {
              'success': True,
              'data': username,
          }

          dump = json.dumps(data)
          print(dump)
        #   return HttpResponse(dump, content_type='application/json')
     
        #   files = {'username':username,'password': md5_password}
          files= dict(username=username,password=md5_password)
          print('files ' + json.dumps(files))

          multipart_data = MultipartEncoder(
            fields = { 
                'username' : username,
                'password' : md5_password
           }
        )

          

          url = 'https://recruitment.fastprint.co.id/tes/api_tes_programmer'
          headers = {'Content-Type': multipart_data.content_type}
          response = requests.post(url,headers=headers,data=multipart_data)
          print(response.status_code)
          output = response.json()
          print('The response from the server is: \n', output)
          return HttpResponse(json.dumps(output), content_type='application/json')