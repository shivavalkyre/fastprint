var url;
function newProduk(){
    $('#dlg3').dialog('open').dialog('center').dialog('setTitle','New Produk');
    // $('#fm').form('clear');
    $('#nama_produk').textbox('setValue','')
    $('#harga').textbox('setValue','')
    url = 'produk/create/';
}
function editProduk(){
    var row = $('#dg3').datagrid('getSelected');
    if (row){
        $('#dlg3').dialog('open').dialog('center').dialog('setTitle','Edit Produk');
        $('#fm3').form('load',row);
        url = 'produk/update/'+ row.id_produk;
    }
}
function saveProduk(){
    $('#fm3').form('submit',{
        url: url,
        iframe: false,
        onSubmit: function(){
            return $(this).form('validate');
        },
        success: function(result){
            var result = eval('('+result+')');
            if (result.errorMsg){
                $.messager.show({
                    title: 'Error',
                    msg: result.errorMsg
                });
            } else {
                $('#dlg3').dialog('close');        // close the dialog
                $('#dg3').datagrid('reload');    // reload the user data
            }
        }
    });
}
function destroyProduk(){
    var row = $('#dg3').datagrid('getSelected');
    if (row){
        $.messager.confirm('Confirm','Are you sure you want to destroy this data?',function(r){
            if (r){
                $.ajax({
                    url: 'produk/delete/' + row.id_produk,
                    type: 'GET',
                    success: function(result) {
                        // Do something with the result
                        $('#dg3').datagrid('reload')
                    }
                });
            }
        });
    }
}