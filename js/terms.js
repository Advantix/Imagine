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
	headerHtml('Terms and Conditions');
	
}
