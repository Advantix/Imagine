if(dataAppConfig==null || userData==null) {
	window.location.href='index.html';
}
headerHtml('Change Password');	
// Register Post	
$('#user_id').val(userData.user_data.userid);
$("#paswrdButtonId").click(function() {
	$("#pageLoader").show();
	$('#changePasswrdId').submit();
});

$('#changePasswrdId').submit(function(){		
	var postData = $(this).serialize();
	//alert(postData);
	$.ajax({
		type: 'POST',
		data: postData,
		url: serviceURL+'resetpassword',
		success: function(data){
			//window.localStorage.setItem('userData',JSON.stringify(data));
			//alert(data);
			console.log(data);
			alert(data.response);
			$("#pageLoader").hide();
		},
		error: function(){
			console.log(data);
			alert('There was an error in password reset!');
			$("#pageLoader").hide();
		}
	});
	
	return false;
});