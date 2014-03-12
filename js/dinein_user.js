if(dataAppConfig==null) {
	window.location.href='index.html';
}

$("#pageLoader").hide();	



function userValidate() {
	
	var error = new Array();
	var errorMessage = "";
	var frm = document.registerFrmId;	
	
	error[0] = nameCheck(frm.fname.value,'First Name') ? "" : "This is not a valid first name";
	error[1] = nameCheck(frm.lname.value,'Surname') ? "" :  "This is not a valid Surname";
	error[2] = phoneCheck(frm.mobile.value,'Mobile Number') ? "" :  "Please provide mobile number";
	error[3] = checkText(frm.email,'Email') ? "" :  "Email Address is empty!";
	if(error[3]=="") {
		error[3]=emailCheck(frm.email.value) ? "" : "This is not valid email address";	
	}
	if( $('#termLiId').is(':visible') ) {
		if(frm.term.checked == false) {
				error[4] = "Accept Terms and Conditions!";
		}
	}
			
	
	
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
		data: postData+'&store_id='+store_id+'&restaurant_id='+restId,
		url: serviceURL+'register',
		success: function(data){
			//alert(JSON.stringify(data));
			if(data.response == 1) {
				window.localStorage.setItem('userData',JSON.stringify(data));
				console.log(data);
				//alert(data.user_data.userid);
				//alert("User Registered Successfully, the password sent to your email");
				//$("#pageLoader").hide();				
				bookReservation(postData,data.user_data.userid);
			}else if(data.response == 2) {
				window.localStorage.setItem('userData',JSON.stringify(data));
				console.log(data);
				//alert(data.user_data.userid);
				//alert("User Updated Successfully");
				//$("#pageLoader").hide();
				bookReservation(postData,data.user_data.userid);				
			}else if(data.response == 3) {
				window.localStorage.setItem('userData',JSON.stringify(data));
				console.log(data);
				//alert(data.user_data.userid);
				//alert("You are not changed User information");
				//$("#pageLoader").hide();
				bookReservation(postData,data.user_data.userid);				
			}else{
				//window.localStorage.setItem('userData',JSON.stringify(data));
				console.log(data);				
				alert(data.response);
				//$("#pageLoader").hide();
				//bookReservation(postData,'');		
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

showPrevValue();

function showPrevValue(){	
	//alert(JSON.stringify(userData));
	headerHtml('Reservation Details');	
	var bookingDetailsArr = window.localStorage.getItem('bookingDetailsArray');	

	if(bookingDetailsArr!=null) {
		var bookVal = JSON.parse(bookingDetailsArr);
		dateGiven1=getDateFormat(bookVal.booking_date);//alert(dateGiven1);
		$('#bookingDate').html(dateGiven1);//alert(bookVal.num_gust_online);
		if(bookVal.seating=='bkfst') { amPm='am'} else {amPm='pm' }
		$('#numGuest').html(bookVal.num_gust_online+' Guests for  ' + bookVal.time_val.replace('_',':') + amPm);

		$('#time_validate').val(bookVal.time_val.replace('_',':'));
		$('#booking_date').val(bookVal.booking_date);
		$('#num_guest').val(bookVal.num_gust_online);
		$('#comments').val(bookVal.comments);//alert(bookVal.seating);
		$('#seating').val(bookVal.seating);
		//alert(bookVal.time_val);
	}
	var userDataval = window.localStorage.getItem('userData');
	if(userDataval!=null) {
		var userData = JSON.parse(userDataval);
		//alert(JSON.stringify(userData));
		//$('#user_id').val(userData.user_data.userid);
		$('#fname').val(userData.user_data.fname);
		$('#lname').val(userData.user_data.lname);
		$('#email').val(userData.user_data.email);
		//$('#email').attr('readonly', true);
		$('#mobile').val(userData.addr_data.mobile);	 
		$('#termLiId').hide();	 
	} 
	
}

function bookReservation(postData,userId) {

	postDataAll = postData+'&restaurant_id='+restId+'&user_id='+userId+'&store_id='+store_id;
	
	//alert(postDataAll);
	//var postData = $(this).serialize();
	//alert(serviceURL+'register_post');
	$.ajax({
		type: 'POST',
		data: postDataAll,
		url: serviceURL+'bookingorder',
		success: function(data){
			//alert(data);
			if(data.response == 1) {				
				//alert("Reservation Successfully registered");
				window.localStorage.removeItem('bookingDetailsArray');
				$("#pageLoader").hide();				
				window.location.href='confirm_booking.html?bokId='+data.booking_id;
			}else{
				console.log(data);				
				alert(data.response);
				$("#pageLoader").hide();
			}	
		},
		error: function(data){
			console.log(data);
			alert('There was an error adding your reservation ');
			$("#pageLoader").hide();
		}
	});
	
	return false;
}

function checkTerm(idVal,val) {
	//alert(val);
	var userDataval = window.localStorage.getItem('userData');
	if(userDataval!=null) {
		em=$('#email').val();
		sur=$('#lname').val();
		//alert(userData.user_data[idVal]+":"+val);
		if(em!=userData.user_data.email || sur!=userData.user_data.lname) {
			$('#termLiId').show();
		} else {
			$('#termLiId').hide();
		}
	}
}