if(dataAppConfig==null) {
	window.location.href='index.html';
}
$("#loginBtnId").click(function() {
	headerHtml('Login');	
	$("#loginFrmId").show();
	$("#registerFrmId").hide();	
	$("#addrFrmId").hide();
	window.localStorage.setItem('form_active','#loginFrmId'); // store local storage
	//window.localStorage.setItem('form_inactive','#registerFrmId'); // store local storage
});

$("#signupBtnId").click(function() {
	if(form_active_url==null) {
		headerHtml('Register');	
	} else {
		headerHtml('Account Details');
	}
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
	headerHtml('Billing Address');	
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
//alert(formInActive);
if(formActive==null) {	
	$("#addrBtnId").hide();
	$("#logoutBtnId").hide();
	$("#userName").hide();
	$('#loginFrmId').show();
	headerHtml('Login');	
} else {	
	if(userData==null) {
		if(form_active_url==null) {
			headerHtml('Login');
		}
		$("#addrBtnId").hide();
		$("#userName").hide();
		$("#logoutBtnId").hide();
		$(formActive).show();
	} else {		
		//headerHtml('Login');
		$("#loginBtnId").hide();	
		var form_active_url = getUrlVars()["form_active"];
		if(form_active_url!=null) {
			showPrevValue(form_active_url);
			$('#'+form_active_url).show();
			if(form_active_url=='registerFrmId') {
				headerHtml('Account Details');
			} else {
				headerHtml('Billing Details');
			}
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
	if(userValidate()==true) {
		$("#pageLoader").show();
		$('#registerFrmId').submit();
	}
});

$('#registerFrmId').submit(function(){		
	var postData = $(this).serialize();
	//alert(serviceURL+'register_post');
	$.ajax({
		type: 'POST',
		data: postData+'&store_id='+store_id,
		url: serviceURL+'register',
		success: function(data){
			//alert(JSON.stringify(data));
			if(data.response == 1) {
				window.localStorage.setItem('userData',JSON.stringify(data));
				console.log(data);
				alert("User Registered Successfully, the password sent to your email");
				$("#pageLoader").hide();
				window.localStorage.setItem('form_active','#addrFrmId'); // store local storage
				window.location.href='myaccount.html';
			}else if(data.response == 2) {
				window.localStorage.setItem('userData',JSON.stringify(data));
				console.log(data);
				alert("User Updated Successfully");
				$("#pageLoader").hide();
			}else if(data.response == 3) {
				window.localStorage.setItem('userData',JSON.stringify(data));
				console.log(data);
				alert("You are not changed User information");
				$("#pageLoader").hide();
			}else{
				console.log(data);				
				alert(data.response);
				$("#pageLoader").hide();
			}	
		},
		error: function(data){
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
		data: postData+'&store_id='+store_id,
		url: serviceURL+'login',
		success: function(data){	
			//alert(JSON.stringify(data));
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
		error: function(data){
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
		data: postData+'&store_id='+store_id,
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
		$('#mobile').val(userData.addr_data.mobile);
	} else if(formName=="addrFrmId" || formName=="#addrFrmId") {
		$('#add_user_id').val(userData.user_data.userid);
		$('#street_number').val(userData.addr_data.address);
		$('#street_name').val(userData.addr_data.street);
		$('#suburb').val(userData.addr_data.city);
		$('#postcode').val(userData.addr_data.post_code);	
	}
	
}


function userValidate() {
	
	var error = new Array();
	var errorMessage = "";
	var frm = document.registerFrmId;	
	
	error[0] = nameCheck(frm.fname.value) ? "" : "This is not a valid first name";
	error[1] = nameCheck(frm.lname.value) ? "" :  "This is not a valid Surname";
	error[2] = phoneCheck(frm.mobile.value) ? "" :  "Please provide mobile number";
	error[3] = checkText(frm.email) ? "" :  "Email Address is empty!";
	if(error[3]=="") {
		error[3]=emailCheck(frm.email.value) ? "" : "This is not valid email address";	
	}
	/*if( $('#termLiId').is(':visible') ) {
		if(frm.term.checked == false) {
				error[4] = "Accept Terms and Conditions!";
		}
	}*/
			
	
	
	for(var i= 0 ;i<error.length; ++i)
		if(error[i]!=undefined)
			errorMessage+= error[i] != "" ? " * " +error[i]+"\n" : "";

		if(errorMessage == "") {			
			return true;
		} else {
			alert(errorMessage);
			return false;
		}

}