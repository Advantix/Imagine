if(dataAppConfig==null) {
	window.location.href='index.html';
}

//$('#services').bind('pageinit', function(event) {
	//if(checkConnection()) {
		getInfoMenuList();
	//}
//});
$.ajaxSetup({ cache: false });


function getInfoMenuList() {
	//$.getJSON(serviceURL, function(data) {
		$('#infoPage li').remove();		
		
		//var menus = data.MenuInfo;
		//$.each(menus, function(index, menu) {
		
		$('#infoPage').append('<li><a href="restaurant_details.html" class="ui-link-inherit" rel="external">Restaurant Details</a></li>');	
		$('#infoPage').append('<li><a href="terms.html" class="ui-link-inherit" rel="external">Terms</a></li>');
		$('#infoPage').append('<li><a href="help.html" class="ui-link-inherit" rel="external">Help</a></li>');		
		//});
				
		//$('#infoPage').listview('refresh');
	//});
}
