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
		
	window.localStorage.setItem('welcomeDiv','<ul class="clearfix"><li>'+userData.user_data.fname+'</li><li>|</li><li><span ><a href="#" id="logoutBtnId" rel="external" style=" color:#fff;">logout</a></span></li><li>|</li><li><span><a href="checkout.html" id="cartBtnId" rel="external" style=" color:#fff;">Cart <span style="color:#ff0000">['+cartCount+']</span></a></span></li></ul><div  class="ui-menu-right"> <a href="myaccount.html" rel="external"><img src="img/icon_menu.png" alt=""></a></div>'); // store local storage
	var welcomeDiv = window.localStorage.getItem('welcomeDiv');
	$('#userName').html(welcomeDiv);
	
	
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
}

function getMenuList() {
	//$.getJSON(serviceURL, function(data) {
		$('#employeeList li').remove();		
		
		//var menus = data.MenuInfo;
		//$.each(menus, function(index, menu) {
		
		$('#employeeList').append('<li><a href="index.html" class="ui-link-inherit" rel="external">Change Location</a></li>');	
		$('#employeeList').append('<li><a href="register.html?form_active=registerFrmId" class="ui-link-inherit" rel="external">Account Details</a></li>');
		$('#employeeList').append('<li><a href="register.html?form_active=addrFrmId" class="ui-link-inherit" rel="external">Billing Address</a></li>');
		$('#employeeList').append('<li><a href="order_info.html" class="ui-link-inherit" rel="external">Order History</a></li>');
		$('#employeeList').append('<li><a href="checkout.html" class="ui-link-inherit" rel="external">View Cart</a></li>');
		$('#employeeList').append('<li><a href="change_password.html" class="ui-link-inherit" rel="external">Change Password</a></li>');
		$('#employeeList').append('<li><a href="showMenu.html" class="ui-link-inherit" rel="external">View Menu</a></li>');
		$('#employeeList').append('<li><a href="deal.html" class="ui-link-inherit" rel="external">View Deal</a></li>');
		$('#employeeList').append('<li><a href="#" id="logoutBtnId" onclick="logout();" rel="external" class="ui-link-inherit">Logout</a></li>');
		//});
				
		//$('#employeeList').listview('refresh');
	//});
}
