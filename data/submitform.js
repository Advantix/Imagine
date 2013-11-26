$(document).ready(function(){
	$("#submit").click(function(){					   				   
		$(".error").hide();
		var hasError = false;
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
		var emailFromVal = $("#emailFrom").val();
		if(emailFromVal == '') {
			$("#emailFrom").after('<div data-role="fieldcontain" class="error">You forgot to enter the email address to send from.</div>');
			hasError = true;
		} else if(!emailReg.test(emailFromVal)) {	
			$("#emailFrom").after('<div data-role="fieldcontain" class="error">Enter a valid email address to send from.</div>');
			hasError = true;
		}
		
		var subjectVal = $("#subject").val();
		if(subjectVal == '') {
			$("#subject").after('<div data-role="fieldcontain" class="error">You forgot to enter the subject.</div>');
			hasError = true;
		}
		
		var messageVal = $("#message").val();
		if(messageVal == '') {
			$("#message").after('<div data-role="fieldcontain" class="error">You forgot to enter the message.</div>');
			hasError = true;
		}
		
		if(hasError == false) {
			$(this).hide();
			$("#sendEmail li.buttons").append('<img src="data/loader.gif" alt="Loading" id="loading" />');
			
			$.post("data/sendemail.html",
   				{ emailFrom: emailFromVal, subject: subjectVal, message: messageVal },
   					function(data){
						$("#sendEmail").slideUp("normal", function() {				   
							
							$("#sendEmail").before('<h1>Success</h1><p>Your email was sent.</p>');											
						});
   					}
				 );
		}
		
		return false;
	});						   
});