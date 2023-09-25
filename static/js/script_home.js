// $( document ).ready(function() {
//     read_api()

// });


$(function(){
    
    read_api()


    // $('#btn1').bind('click', function(){
    //     generate_kategori()

    // });

    $( "#btn1" ).linkbutton({
        onClick: function() {
             $("#btn1" ).linkbutton('disable');
             generate_kategori()

        }
 
    });

    $( "#btn2" ).linkbutton({
        onClick: function() {
             $("#btn2" ).linkbutton('disable');
             generate_status()

        }
 
    });

    $( "#btn3" ).linkbutton({
        onClick: function() {
             $("#btn3" ).linkbutton('disable');
             generate_produk()

        }
 
    });



    // $('#btn2').bind('click', function(){
    //     generate_status()

    // });

    // $('#btn3').bind('click', function(){
    //     generate_produk()

    // });

    
});



async function read_api(){

    $('#title').text('Read API')
    $('#p3').css('visibility','visible')
    $('#p3').css('margin-top','0px')

    var url = 'api'
    var response = await fetch(url)  //api for the get request
    .then(response => response.json())
    .then(function(data){
        // console.log(data);
        // return data;
        $('#p2').panel({
            href: 'api_content',
            onLoad:function(){
                // alert('loaded successfully');
                $('#res_api').textbox('setValue',JSON.stringify(data.data))
            }
        })
        return data
    });

    return response

}

async function generate_kategori(){
    // alert('kategori')
    var response = await read_api()
    // console.log(response)
    var data = response.data
    // alert(data.length)
    var arr_kategori = []
    for (i=0;i<= data.length-1;i++){
        var kategori = data[i].kategori
        var kategori_trim = kategori.trim()

        // console.log('i:' + i )
        if (i==0){
            // console.log('kategori',kategori_trim)
            arr_kategori.push(kategori_trim)
            // console.log('arr_kategori',arr_kategori)
        }else{
            // console.log('kategori',kategori_trim)
            var find_result = searchStringInArray(kategori_trim,arr_kategori)
            // console.log('find result',find_result)

            if (find_result === 0){
                arr_kategori.push(data[i].kategori)
                // console.log('arr_kategori',arr_kategori)
            }
        }
    }

    // store data to database
   process_store_data_kategori(arr_kategori)



}

async function process_store_data_kategori(arr_data){

    var url =  '/static/images/loader.gif';
    
    var win = $.messager.progress({
        border: 'thin',
        msg:'<div style="margin-top:15px;margin-left:20px;"><img src="'+ url +'" style="height:50px;width:50px;"></div>',
        width:130,
        height:135
    });

    

    $.messager.progress('bar').hide();
    win.dialog('resize');
    win.window('window').addClass('bg1');

    // console.log(arr_data)
    // 1. delete data from db
    var url = 'kategori/delete'
    var response_delete = await fetch(url)  //api for the get request
    .then(response => response.json())
    .then(function(data){
        // console.log('data',data)
        return data
    })

    // 2. insert data to db

    if (response_delete.success == true){
        var url = 'kategori/create/'
        var counter_insert = 0
        // const obj = {nama_kategori : arr_data[i]};
        // var data = JSON.stringify(obj)
        


        for (i=0;i<= arr_data.length-1;i++){

            let formData = new FormData();
            formData.append("nama_kategori", arr_data[i]);
            // add form input from hidden input elsewhere on the page
            formData.append('csrfmiddlewaretoken', $('input[name=csrfmiddlewaretoken]').val());
                
            // for (var pair of formData.entries()) {
            //     console.log(pair[0]+ ' - ' + pair[1]); 
            // }

            var response_insert = await fetch(url,{
                method: 'POST',
                body: formData,
            })  //api for the get request
            .then(response => response.json())
            .then(function(data){
                // console.log('data',data)
                return data
            })

            if (response_insert.success == true) {
                counter_insert++
            }
        }


        if (counter_insert == arr_data.length){
            $.messager.progress('close')
            $.messager.alert('Novate','Insert data sukses','info');

            // $('#btn1').linkbutton('disable')
            $('#btn2').linkbutton('enable')
            // $('#btn3').linkbutton('disable')

            // $('#btn1').linkbutton({
            //     disabled:true
            // })
            // $('#btn2').linkbutton({
            //     disabled:false
            // })
            // $('#btn3').linkbutton({
            //     disabled:true
            // })
        }
    }
}

async function generate_status(){
    // alert('kategori')
    var response = await read_api()
    // console.log(response)
    var data = response.data
    // alert(data.length)
    var arr_status = []
    for (i=0;i<= data.length-1;i++){
        var status = data[i].status
        var status_trim = status.trim()

        // console.log('i:' + i )
        if (i==0){
            // console.log('status',status_trim)
            arr_status.push(status_trim)
            // console.log('arr_status',arr_status)
        }else{
            // console.log('status',status_trim)
            var find_result = searchStringInArray(status_trim,arr_status)
            // console.log('find result',find_result)

            if (find_result === 0){
                arr_status.push(data[i].status)
                // console.log('arr_status',arr_status)
            }
        }
    }

    // store data to database
   process_store_data_status(arr_status)



}

async function process_store_data_status(arr_data){

    var url =  '/static/images/loader.gif';
    
    var win = $.messager.progress({
        border: 'thin',
        msg:'<div style="margin-top:15px;margin-left:20px;"><img src="'+ url +'" style="height:50px;width:50px;"></div>',
        width:130,
        height:135
    });

    

    $.messager.progress('bar').hide();
    win.dialog('resize');
    win.window('window').addClass('bg1');

    // console.log(arr_data)
    // 1. delete data from db
    var url = 'status/delete'
    var response_delete = await fetch(url)  //api for the get request
    .then(response => response.json())
    .then(function(data){
        // console.log('data',data)
        return data
    })

    // 2. insert data to db

    if (response_delete.success == true){
        var url = 'status/create/'
        var counter_insert = 0
        // const obj = {nama_kategori : arr_data[i]};
        // var data = JSON.stringify(obj)
        


        for (i=0;i<= arr_data.length-1;i++){

            let formData = new FormData();
            formData.append("nama_status", arr_data[i]);
            // add form input from hidden input elsewhere on the page
            formData.append('csrfmiddlewaretoken', $('input[name=csrfmiddlewaretoken]').val());
                
            // for (var pair of formData.entries()) {
            //     console.log(pair[0]+ ' - ' + pair[1]); 
            // }

            var response_insert = await fetch(url,{
                method: 'POST',
                body: formData,
            })  //api for the get request
            .then(response => response.json())
            .then(function(data){
                // console.log('data',data)
                return data
            })

            if (response_insert.success == true) {
                counter_insert++
            }
        }


        if (counter_insert == arr_data.length){
            $.messager.progress('close')
            $.messager.alert('Novate','Insert data sukses','info');

            $('#btn3').linkbutton('enable')

            // $('#btn1').linkbutton({
            //     disabled:true
            // })
            // $('#btn2').linkbutton({
            //     disabled:true
            // })
            // $('#btn3').linkbutton({
            //     disabled:false
            // })
        }
    }
}

async function generate_produk(){
    var response = await read_api()
    var data = response.data

    process_store_data_produk(data)

}

async function process_store_data_produk(data){

    var url =  '/static/images/loader.gif';
    
    var win = $.messager.progress({
        border: 'thin',
        msg:'<div style="margin-top:15px;margin-left:20px;"><img src="'+ url +'" style="height:50px;width:50px;"></div>',
        width:130,
        height:135
    });

    

    $.messager.progress('bar').hide();
    win.dialog('resize');
    win.window('window').addClass('bg1');

    // 1. delete data from db
    var url = 'produk/delete'
    var response_delete = await fetch(url)  //api for the get request
    .then(response => response.json())
    .then(function(data){
        // console.log('data',data)
        return data
    })   

    if (response_delete.success == true){
        // console.log(response_delete)
        var counter_insert = 0

        // $.messager.progress('close')

        for (i=0;i<=data.length-1;i++){
             // 2. insert data to db

            // get kategori_id by kategori
            var url = 'kategori/read/'+ data[i].kategori
            var kat = await fetch(url)
            .then(response => response.json())
            .then(function(resp){
                // console.log('resp',resp)
                return resp
            })   

            var id_kategori = kat.data
            // console.log('counter: ' + i)
            // console.log('id kategori',id_kategori)

            // get kategori_id by kategori
            var url = 'status/read/'+ data[i].status
            var state = await fetch(url)
            .then(response => response.json())
            .then(function(resp){
                // console.log('resp',resp)
                return resp
            })  
            
            var id_status = state.data
            // console.log('id status',id_status)

            let formData = new FormData();
            formData.append("nama_produk", data[i].nama_produk);
            formData.append("harga", parseInt(data[i].harga));
            formData.append("kategori_id", parseInt(id_kategori));
            formData.append("status_id", id_status);
            // add form input from hidden input elsewhere on the page
            formData.append('csrfmiddlewaretoken', $('input[name=csrfmiddlewaretoken]').val());

            // for (var pair of formData.entries()) {
            //     console.log(pair[0]+ ' - ' + pair[1]); 
            // }

            var url = 'produk/create/'
            var response_insert = await fetch(url,{
                method: 'POST',
                body: formData,
            })  //api for the get request
            .then(response => response.json())
            .then(function(data){
                // console.log('data',data)
                return data
            })

            if (response_insert.success == true) {
                counter_insert++
            }
        }

        if (counter_insert == data.length){
            $.messager.progress('close')
            $.messager.alert('Novate','Insert data sukses','info');
            $('#btn1').linkbutton('enable')
            // $('#btn1').linkbutton({
            //     disabled:false
            // })
            // $('#btn2').linkbutton({
            //     disabled:true
            // })
            // $('#btn3').linkbutton({
            //     disabled:true
            // })
        }
       
    }
    // for (i=0;i<=data.length-1;i++){

    // }
}

function searchStringInArray (str, strArray) {
    var counter = 0
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j] == str) {
            counter = 1
        }
    }
    return counter
}


function read_produk(){
    // alert('produk')
    $('#title').text('Produk')
    $('#p3').css('visibility','hidden')
    $('#p3').css('margin-top','-40px')

    $('#p2').panel({
        href: 'produk',
        onLoad:function(){
            // alert('loaded successfully');
            
        }
    })
}

function read_kategori(){
    // alert('kategori')
    $('#title').text('Kategori')
    $('#p3').css('visibility','hidden')
    $('#p3').css('margin-top','-40px')


    $('#p2').panel({
        href: 'kategori',
        onLoad:function(){
            // alert('loaded successfully');
            
        }
    })
}

function read_status(){
    // alert('status')
    $('#title').text('Status')
    $('#p3').css('visibility','hidden')
    $('#p3').css('margin-top','-40px')

    $('#p2').panel({
        href: 'status',
        onLoad:function(){
            // alert('loaded successfully');
            
        }
    })
}

function about_app(){
    $('#w').window('open')
}

function logout_app(){
    $.messager.confirm('Novate', 'Are you want to logout?', function(r){
        if (r){
           fetch('logout')
           .then(response=> response.json())
           .then(function(data){
            console.log(data)
                if (data.success == true){
                    window.location.href = "/";
                }
           })
        }
    });
}
