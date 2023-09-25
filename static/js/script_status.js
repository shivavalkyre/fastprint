var url;
function newStatus(){
    $('#dlg2').dialog('open').dialog('center').dialog('setTitle','New Status');
    // $('#fm').form('clear');
    $('#nama_status').textbox('setValue','')
    url = 'status/create/';
}
function editStatus(){
    var row = $('#dg2').datagrid('getSelected');
    if (row){
        $('#dlg2').dialog('open').dialog('center').dialog('setTitle','Edit Status');
        $('#fm2').form('load',row);
        url = 'status/update/'+ row.id_status;
    }
}
function saveStatus(){
    $('#fm2').form('submit',{
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
                $('#dlg2').dialog('close');        // close the dialog
                $('#dg2').datagrid('reload');    // reload the user data
            }
        }
    });
}
function destroyStatus(){
    var row = $('#dg2').datagrid('getSelected');
    if (row){
        $.messager.confirm('Confirm','Are you sure you want to destroy this data?',function(r){
            if (r){
                $.ajax({
                    url: 'status/delete/' + row.id_status,
                    type: 'GET',
                    success: function(result) {
                        // Do something with the result
                        $('#dg2').datagrid('reload')
                    }
                });
            }
        });
    }
}