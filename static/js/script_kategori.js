var url;
function newKategori(){
    $('#dlg1').dialog('open').dialog('center').dialog('setTitle','New Kategori');
    // $('#fm').form('clear');
    $('#nama_kategori').textbox('setValue','')
    url = 'kategori/create/';
}
function editKategori(){
    var row = $('#dg1').datagrid('getSelected');
    if (row){
        $('#dlg1').dialog('open').dialog('center').dialog('setTitle','Edit Kategori');
        $('#fm1').form('load',row);
        url = 'kategori/update/'+ row.id_kategori;
    }
}
function saveKategori(){
    $('#fm1').form('submit',{
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
                $('#dlg1').dialog('close');        // close the dialog
                $('#dg1').datagrid('reload');    // reload the user data
            }
        }
    });
}
function destroyKategori(){
    var row = $('#dg1').datagrid('getSelected');
    if (row){
        $.messager.confirm('Confirm','Are you sure you want to destroy this data?',function(r){
            if (r){
                $.ajax({
                    url: 'kategori/delete/' + row.id_kategori,
                    type: 'GET',
                    success: function(result) {
                        // Do something with the result
                        $('#dg1').datagrid('reload')
                    }
                });
            }
        });
    }
}