if(dataAppConfig==null) {
	window.location.href='index.html';
}
var userData = JSON.parse(window.localStorage.getItem('userData'));
if(userData==null) {
	window.location.href='register.html';
} else {	

	var carDataGetcnt = JSON.parse(window.localStorage.getItem('carDatas'));
	var carDataGetDealCnt = JSON.parse(window.localStorage.getItem('dealItemsId'));
	
	
	if(carDataGetDealCnt!=null) {
		cartCount = 1;
	} else if(carDataGetcnt!=null) {
		var cartItemCntView=carDataGetcnt.items.length;
		cartCount = cartItemCntView;
	} else {
		cartCount = 0;
	}
	
	window.localStorage.setItem('welcomeDiv','Welcome <span style="margin-right:20px;color:#ff0000">'+userData.user_data.fname+'</span><span style="margin-right:20px;"><a href="#" id="logoutBtnId" rel="external">logout</a></span><span style="margin-right:10px;"><a href="checkout.html" id="cartBtnId" rel="external">Cart ['+cartCount+']</a></span><span><a href="myaccount.html" rel="external">My Account</a></span>'); // store local storage
	var welcomeDiv = window.localStorage.getItem('welcomeDiv');
	$('#userName').html(welcomeDiv);
	
	
	$("#logoutBtnId").click(function() {
		window.localStorage.removeItem('userData');		
		window.localStorage.removeItem('welcomeDiv');	
		window.localStorage.setItem('form_active','#loginFrmId'); // store local storage
		//window.localStorage.setItem('form_inactive','#registerFrmId'); // store local storage
		window.location.href='register.html';
	});


	$('#services').bind('pageinit', function(event) {
		//if(checkConnection()) {
			getMenuList();
		//}
	});
	$.ajaxSetup({ cache: false });
}

function getMenuList() {
	//$.getJSON(serviceURL, function(data) {
		$('#employeeList li').remove();		
		
		//var menus = data.MenuInfo;
		//$.each(menus, function(index, menu) {
			
		$('#employeeList').append('<li><a href="register.html?form_active=registerFrmId" class="ui-link-inherit" rel="external">Account Details</a></li>');
		$('#employeeList').append('<li><a href="register.html?form_active=addrFrmId" class="ui-link-inherit" rel="external">Billing Address</a></li>');
		$('#employeeList').append('<li><a href="order_info.html" class="ui-link-inherit" rel="external">Order History</a></li>');
		$('#employeeList').append('<li><a href="checkout.html" class="ui-link-inherit" rel="external">View Cart</a></li>');
		$('#employeeList').append('<li><a href="change_password.html" class="ui-link-inherit" rel="external">Change Password</a></li>');
		//});
				
		$('#employeeList').listview('refresh');
	//});
}
