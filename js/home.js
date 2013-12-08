$('#typography').live('pageshow', function(event) {	
	//if(checkConnection()) {
		showHomePage();
	//}
});
$.ajaxSetup({ cache: false });
function showHomePage() {		
		var appData = JSON.parse(window.localStorage.getItem('configData'));
		var htmlIn='';
		buttonArray=resData.service_options;
		buttonArray=buttonArray.split('-');
		//alert(buttonArray);
		if(appData.GlobalConfig.deal_status=='A') {
			//$("#dealDivId").append('<div class="ui-body ul-pizzaimg"><a href="showMenu.html" rel="external"><img src="'+data.AppConfig.deal_img+'" alt="" id="bannerId"></a></div>');		
		}
		
		if(buttonArray[1]==1) {
			if(buttonArray[2]==1) {cssSt="ui-rfloat "} else {cssSt=""}
				htmlIn+='<a rel="external" class="'+cssSt+'ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-c gra_but" data-inline="true" data-role="button" href="showMenu.html" data-theme="b"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"><i class="delive_ic"></i>'+appData.GlobalConfig.delivery_label+'</span></span></a>';
		}
		if(buttonArray[2]==1) {
			htmlIn+='<a rel="external" class="ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-c gra_but" data-inline="true" data-role="button" href="showMenu.html" data-theme="b"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"><i class="takeaw_ic"></i>'+appData.GlobalConfig.takeaway_label+'</span></span></a>';
		}
		if(appData.AppConfig.see_the_menu_btn=='A') {
			htmlIn+='<a rel="external" data-role="button" href="showMenu.html" data-theme="c" class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-c gra_but"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text add_cart_txt">'+appData.GlobalConfig.see_the_menu_label+'</span></span></a>';
		}
	
		
		$('#employeeList').append(htmlIn);
}