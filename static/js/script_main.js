
function loginApp() {

    url = 'main/loginapp';
	$('#fmLogin').form('submit',{
		url: url,
		onSubmit: function(){
			return $(this).form('enableValidation').form('validate');
		},
		success: function(result){
			var result = eval('(' + result + ')');
			console.log('result',result)
            console.log('success',result.success)
			// console.log('data',result.data)
			var success = result.success
			var data = result.data


			if(success === false){
				$.messager.alert('Novate',data,'error');
			}else{
				window.location.href = "home";
				// console.log(result)
				// alert(result)
			}
        }
    })
}