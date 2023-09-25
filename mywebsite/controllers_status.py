# from django.shortcuts import render
from django.http import HttpResponse
from produk.models import status
import json

def create(request):
    
    if request.method == "POST":
        kat = status(nama_status=request.POST['nama_status'])
        kat.save()
        data = {
                'success'   : True,
                'data'      : 'Data berhasil diinput'
                    }
        dump = json.dumps(data)
        print(dump)
        return HttpResponse(dump, content_type='application/json')
    
def read(request):
    
    if request.method == "GET":

        
        print ('request ===========================')
        url = request.build_absolute_uri()
        # print('url:',url)

        find_page = url.find('?page=')
        # print('find page:',find_page)
        start_mid_page = find_page + 6
        find_rows = url.find('&rows=')
        # print('find rows:',find_rows)
        start_mid_rows = find_rows + 6
        # print('start_mid_row:',start_mid_rows)
        page = int(url[start_mid_page:find_rows])
        print('page:',page)

        len_url = len(url)
        # print('len url:',len_url)
        rows = int(url[start_mid_rows:len_url])
        print('rows:',rows)

        offset = (page-1) * rows
        print('offset:',offset)

        # page_request = page
        # print('page')
        # print(page_request)
        # rows_request = request.rows
        # print('rows')
        # print(rows_request)
        limit= page * rows

        total = status.objects.count()
        print(total)
        data = list(status.objects.all().values().order_by('id_status')[offset:limit])
        print({'total': total,'rows': data})
        result = json.dumps({'total': total,'rows': data})
       
        # return HttpResponse(dump, content_type='application/json')
        return HttpResponse(result)
    
def read_all(request):
    
    if request.method == "GET":

        
        total = status.objects.count()
        print(total)
        data = list(status.objects.all().values().order_by('id_status'))
        print({'total': total,'rows': data})
        result = json.dumps({'total': total,'rows': data})
       
        # return HttpResponse(dump, content_type='application/json')
        return HttpResponse(result)
    
def readbynama_status(request,nama_status):
    
    if request.method == "GET":
        state = status.objects.get(nama_status=nama_status)
        data = {
                'success'   : True,
                'data'      : state.id_status
                    }
        dump = json.dumps(data)
        print(dump)
        return HttpResponse(dump, content_type='application/json')  
    
def update(request,id_status):
    if request.method == "POST":
        kat = status.objects.get(id_status=id_status)
        kat.nama_status= request.POST['nama_status']
        kat.save()
        data = {
                'success'   : True,
                'data'      : 'Data berhasil diupdate'
                    }
        dump = json.dumps(data)
        print(dump)
        return HttpResponse(dump, content_type='application/json')  

def destroy(request,id_status):

    if request.method == "GET":
        kat = status.objects.get(id_status=id_status)
        kat.delete()
        data = {
                'success'   : True,
                'data'      : 'Data berhasil dihapus'
                    }
        dump = json.dumps(data)
        print(dump)
        return HttpResponse(dump, content_type='application/json')

def delete(request):
    kat = status.objects.all().delete()

    data = {
            'success'   : True,
            'data'      : 'Data berhasil dihapus'
                }
    dump = json.dumps(data)
    print(dump)
    return HttpResponse(dump, content_type='application/json')


 