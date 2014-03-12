	if(dataAppConfig==null) {
	window.location.href='index.html';
}
var userDataval = window.localStorage.getItem('userData');
	
headerHtml('Menu');	

$("#logoutBtnId").click(function() {
	window.localStorage.removeItem('userData');		
	window.localStorage.removeItem('welcomeDiv');	
	window.localStorage.setItem('form_active','#loginFrmId'); // store local storage
	//window.localStorage.setItem('form_inactive','#registerFrmId'); // store local storage
	window.location.href='register.html';
});


//$('#services').bind('pageinit', function(event) {
	//if(checkConnection()) {
		getMenuList();
	//}
//});
$.ajaxSetup({ cache: false });


function getMenuList() {
	//$.getJSON(serviceURL, function(data) {
		$('#employeeList li').remove();		
		
		//var menus = data.MenuInfo;
		//$.each(menus, function(index, menu) {
		
		//$('#employeeList').append('<li><a href="index.html" class="ui-link-inherit" rel="external">Home</a></li>');	
		if(userDataval!=null) {			
			$('#employeeList').append('<li><a href="register.html?form_active=registerFrmId" class="ui-link-inherit" rel="external">Personal Details</a></li>');
			$('#employeeList').append('<li><a href="register.html?form_active=addrFrmId" class="ui-link-inherit" rel="external">Address Details</a></li>');
			//$('#employeeList').append('<li><a href="order_info.html" class="ui-link-inherit" rel="external">Order History</a></li>');
			$('#employeeList').append('<li><a href="confirm_booking.html" class="ui-link-inherit" rel="external">Reservation History</a></li>');
			//$('#employeeList').append('<li><a href="checkout.html" class="ui-link-inherit" rel="external">View Cart</a></li>');
			$('#employeeList').append('<li><a href="change_password.html" class="ui-link-inherit" rel="external">Change Password</a></li>');
		}
		$('#employeeList').append('<li><a href="dinein.html" class="ui-link-inherit" rel="external">Reservation</a></li>');
		$('#employeeList').append('<li><a href="showMenu.html" class="ui-link-inherit" rel="external">Menu</a></li>');
		$('#employeeList').append('<li><a href="deal.html?tabId='+menuId+'" class="ui-link-inherit" rel="external">Deals</a></li>');
		$('#employeeList').append('<li><a href="privacy.html" class="ui-link-inherit" rel="external">Privacy</a></li>');
		$('#employeeList').append('<li><a href="help.html" class="ui-link-inherit" rel="external">Help</a></li>');
		$('#employeeList').append('<li><a href="terms.html" class="ui-link-inherit" rel="external">Terms and Conditions</a></li>');
		$('#employeeList').append('<li><a href="bms.html" class="ui-link-inherit" rel="external">Best Menu Services</a></li>');
		
		if(userDataval!=null) {	
			$('#employeeList').append('<li><a href="#" id="logoutBtnId" onclick="logout();" rel="external" class="ui-link-inherit">Logout</a></li>');
		} else {
			$('#employeeList').append('<li><a href="register.html" class="ui-link-inherit" rel="external">Sign In</a></li>');
		}
		//});
				
		//$('#employeeList').listview('refresh');
	//});
}
