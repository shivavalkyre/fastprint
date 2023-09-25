# from django.shortcuts import render
from django.http import HttpResponse
from produk.models import produk
import json

def create(request):
    
    if request.method == "POST":
        prod = produk(nama_produk=request.POST['nama_produk'],harga=request.POST['harga'],kategori_id=request.POST['kategori_id'],status_id=request.POST['status_id'])
        prod.save()
        data = {
                'success'   : True,
                'data'      : 'Data berhasil diinput'
                    }
        dump = json.dumps(data)
        print(dump)
        return HttpResponse(dump, content_type='application/json')

def read(request):
    
    if request.method == "GET":

        # datas = produk.objects.select_related('kategori').values('id','id_produk','nama_produk','harga','kategori_id','kategori__nama_kategori','status_id','status__nama_status')
        # for d in datas:
        #     print(d.values())

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

        total = produk.objects.select_related('kategori','status').filter(status__nama_status='bisa dijual').count()
        print(total)
       

        # data = list(produk.objects.all().values().order_by('id'))
        data =list(produk.objects.select_related('kategori','status').values('id_produk','nama_produk','harga','kategori_id','kategori__nama_kategori','status_id','status__nama_status').filter(status__nama_status='bisa dijual').order_by('id_produk')[offset:limit])
        print({'total': total,'rows': data})
        result = json.dumps({'total': total,'rows': data})


        # return HttpResponse(dump, content_type='application/json')
        return HttpResponse(result)

def update(request,id_produk):
    if request.method == "POST":
        kat = produk.objects.get(id_produk=id_produk)
        kat.nama_produk = request.POST['nama_produk']
        kat.harga = request.POST['harga']
        kat.kategori_id = request.POST['kategori_id']
        kat.status_id = request.POST['status_id']
        kat.save()
        data = {
                'success'   : True,
                'data'      : 'Data berhasil diupdate'
                    }
        dump = json.dumps(data)
        print(dump)
        return HttpResponse(dump, content_type='application/json')
    
def destroy(request,id_produk):

    if request.method == "GET":
        kat = produk.objects.get(id_produk=id_produk)
        kat.delete()
        data = {
                'success'   : True,
                'data'      : 'Data berhasil dihapus'
                    }
        dump = json.dumps(data)
        print(dump)
        return HttpResponse(dump, content_type='application/json')

def delete(request):
    prod = produk.objects.all().delete()

    data = {
            'success'   : True,
            'data'      : 'Data berhasil dihapus'
                }
    dump = json.dumps(data)
    print(dump)
    return HttpResponse(dump, content_type='application/json')