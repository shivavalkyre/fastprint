# Generated by Django 4.2.5 on 2023-09-25 05:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='kategori',
            fields=[
                ('id_kategori', models.AutoField(primary_key=True, serialize=False)),
                ('nama_kategori', models.TextField(max_length=200)),
            ],
            options={
                'db_table': 'kategori',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='status',
            fields=[
                ('id_status', models.AutoField(primary_key=True, serialize=False)),
                ('nama_status', models.TextField(max_length=200)),
            ],
            options={
                'db_table': 'status',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='produk',
            fields=[
                ('id_produk', models.AutoField(primary_key=True, serialize=False)),
                ('nama_produk', models.TextField(max_length=200)),
                ('harga', models.PositiveIntegerField()),
                ('kategori', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='produk.kategori')),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='produk.status')),
            ],
            options={
                'db_table': 'produk',
                'managed': True,
            },
        ),
    ]