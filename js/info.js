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
	headerHtml('Information');
	//$.getJSON(serviceURL, function(data) {		
		
		//var menus = data.MenuInfo;
		//$.each(menus, function(index, menu) {
		
		infHtml='<a href="restaurant_details.html" class="ui-btn" rel="external">Restaurant Details</a>';	
		infHtml+='<a href="terms.html" class="ui-btn" rel="external">Terms</a>';
		infHtml+='<a href="help.html" class="ui-btn" rel="external">Help</a>';		
		//});
		
		$('#infoPage').html(infHtml);
		//$('#infoPage').listview('refresh');
	//});
}
