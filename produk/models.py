from django.db import models


# Create your models here.
class kategori(models.Model):
    id_kategori = models.AutoField(primary_key=True)
    nama_kategori = models.TextField(max_length=200)

    class Meta:
        managed = True
        db_table ="kategori"

class status(models.Model):
    id_status = models.AutoField(primary_key=True)
    nama_status = models.TextField(max_length=200)

    class Meta:
        managed = True
        db_table ="status"

class produk(models.Model):
    id_produk = models.AutoField(primary_key=True)
    nama_produk = models.TextField(max_length=200)
    harga = models.PositiveIntegerField()
    kategori= models.ForeignKey("kategori",on_delete=models.CASCADE)
    status= models.ForeignKey("status",on_delete=models.CASCADE)

    class Meta:
        managed = True
        db_table ="produk"