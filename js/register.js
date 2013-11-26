if(dataAppConfig==null) {
	window.location.href='index.html';
}
$("#loginBtnId").click(function() {
	$("#loginFrmId").show();
	$("#registerFrmId").hide();	
	$("#addrFrmId").hide();
	window.localStorage.setItem('form_active','#loginFrmId'); // store local storage
	//window.localStorage.setItem('form_inactive','#registerFrmId'); // store local storage
});

$("#signupBtnId").click(function() {
	$("#registerFrmId").show();
	$("#loginFrmId").hide();	
	$("#addrFrmId").hide();
	window.localStorage.setItem('form_active','#registerFrmId'); // store local storage
	//window.localStorage.setItem('form_inactive','#loginFrmId'); // store local storage
	if(userData!=null) {
		showPrevValue('registerFrmId');
	}
});

$("#addrBtnId").click(function() {
	$("#addrFrmId").show();
	$("#registerFrmId").hide();	
	$("#loginFrmId").hide();	
	window.localStorage.setItem('form_active','#addrFrmId'); // store local storage
	//window.localStorage.setItem('form_inactive','#loginFrmId'); // store local storage
	if(userData!=null) {
		showPrevValue('addrFrmId');
	}
});

var formActive=window.localStorage.getItem('form_active');

//var formInActive=window.localStorage.getItem('form_inactive');
if(formActive==null) {	
	$("#addrBtnId").hide();
	$("#logoutBtnId").hide();
	$("#userName").hide();
	$('#loginFrmId').show();
} else {	
	if(userData==null) {
		$("#addrBtnId").hide();
		$("#userName").hide();
		$("#logoutBtnId").hide();
		$(formActive).show();
	} else {		
		$("#loginBtnId").hide();	
		var form_active_url = getUrlVars()["form_active"];
		if(form_active_url!=null) {
			showPrevValue(form_active_url);
			$('#'+form_active_url).show();
		} else {
			showPrevValue(formActive);
			$(formActive).show();
		}
	}
}
//$(formInActive).hide();	

$("#pageLoader").hide();	

// Register Post	
$("#sinupButtonId").click(function() {
	$("#pageLoader").show();
	$('#registerFrmId').submit();
});

$('#registerFrmId').submit(function(){		
	var postData = $(this).serialize();
	//alert(postData);
	$.ajax({
		type: 'POST',
		data: postData+'&store_id=Mw',
		url: serviceURL+'register',
		success: function(data){
			if(data.response == 1) {
				window.localStorage.setItem('userData',JSON.stringify(data));
				console.log(data);
				alert("User Registered Successfully");
				$("#pageLoader").hide();
				window.localStorage.setItem('form_active','#addrFrmId'); // store local storage
				window.location.href='myaccount.html';
			}else if(data.response == 2) {
				window.localStorage.setItem('userData',JSON.stringify(data));
				console.log(data);
				alert("User Updated Successfully");
				$("#pageLoader").hide();
			}else{
				console.log(data);				
				alert(data.response);
				$("#pageLoader").hide();
			}	
		},
		error: function(){
			console.log(data);
			alert('There was an error adding your comment');
			$("#pageLoader").hide();
		}
	});
	
	return false;
});

// Login Post	
$("#loginButtonId").click(function() {
	$("#pageLoader").show();
	$('#loginFrmId').submit();
});

$('#loginFrmId').submit(function(){		
	var postData = $(this).serialize();
	//alert(postData);
	$.ajax({
		type: 'POST',
		data: postData+'&store_id=Mw',
		url: serviceURL+'login',
		success: function(data){			
			if(data.response==1) {
				window.localStorage.setItem('userData',JSON.stringify(data)); // store local storage
				console.log(data);
				//alert(data.addr_data.address);
				alert('User logged in successfully');
				$("#pageLoader").hide();
				window.localStorage.setItem('form_active','#addrFrmId'); // store local storage
				window.location.href='myaccount.html';
			} else {
				console.log(data);				
				alert(data.response);
				$("#pageLoader").hide();
			}
		},
		error: function(){
			console.log(data);
			alert('There was an error adding your comment');
			$("#pageLoader").hide();
		}
	});
	
	return false;
});


// Address Post	
$("#addrButtonId").click(function() {
	$("#pageLoader").show();
	$('#addrFrmId').submit();
});

$('#addrFrmId').submit(function(){		
	var postData = $(this).serialize();
	//alert(postData);
	$.ajax({
		type: 'POST',
		data: postData+'&store_id=Mw',
		url: serviceURL+'updateaddress',
		success: function(data){
			window.localStorage.setItem('userData',JSON.stringify(data));
			console.log(data);
			alert(data.response);
			//alert('Your comment was successfully added');
			$("#pageLoader").hide();
		},
		error: function(){
			console.log(data);
			alert('There was an error adding your comment');
			$("#pageLoader").hide();
		}
	});
	
	return false;
});

function showPrevValue(formName){
	if(formName=="registerFrmId" || formName=="#registerFrmId") {
		//alert(userData.email);
		$('#user_id').val(userData.user_data.userid);
		$('#fname').val(userData.user_data.fname);
		$('#lname').val(userData.user_data.lname);
		$('#email').val(userData.user_data.email);
		$('#email').attr('readonly', true);
		$('#phone').val(userData.addr_data.phone);
	} else if(formName=="addrFrmId" || formName=="#addrFrmId") {
		$('#add_user_id').val(userData.user_data.userid);
		$('#street_number').val(userData.addr_data.address);
		$('#street_name').val(userData.addr_data.street);
		$('#suburb').val(userData.addr_data.city);
		$('#postcode').val(userData.addr_data.post_code);	
	}
	
}
