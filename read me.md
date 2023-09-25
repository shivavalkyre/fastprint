1. Config the database in setting.py 
2. check pip list

	asgiref              3.7.2
	certifi              2023.7.22
	charset-normalizer   3.2.0
	Django               4.2.5
	django-widget-tweaks 1.5.0
	idna                 3.4
	pip                  23.2.1
	psycopg2             2.9.7
	requests             2.31.0
	requests-toolbelt    1.0.0
	setuptools           65.5.0
	sqlparse             0.4.4
	tzdata               2023.3
	urllib3              2.0.5
	
	if not same please install
	
3. Migrate /Import database (the simple way) (if import use username:admin password:p@55w0rd)
2. Create SuperUser
3. run application 

How to use application

1. Login to the application
2. first page will show API hit result page
   at this page you will find 3 buttons
   1. Generate Kategori -> it will generate data from API to kategori table
   2. Generate Status -> it will generate data from API to status table
   3. Generate Produk -> it will generate data from API to produk table
   
   each button process in synconously
   
3. at left you will find sidebar menu

   at sidebar menu you will find 3 button 
   
   1. Kategori -> this button will show kategori page, at this page you can do crud process
   2. Status -> this button will show status page, at this page you can do crud process
   3. Produk -> this button will show produk page, at this page you can do crud process
   
   
   