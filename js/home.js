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
		
		if(appData.AppConfig.deal_status=='A') {
			//alert("dsf");
			$.getJSON(serviceURL+'dealitemlist/'+restId, function(data) {		
				$('#slider4 li').remove();		
				//alert(JSON.stringify(data.DealList));
				
				var items = data.DealList;
				$.each(items, function(index, item) {
					//alert(item.item_img);
					dealItemsId=item.deal_items_id=="" ? null :1;
					 $('#slider4').append('<li><a href="deal.html?delitemId='+item.item_id+'" rel="external"><img src="'+itemImgURL+(item.item_img!=""? item.item_img:defaultImgURL)+'" alt=""></a></li>');		
					
				});
			});
		}
		
		if(buttonArray[1]==1) {
			if(buttonArray[0]==1) {cssSt="ui-rfloat "} else {cssSt=""}
				htmlIn+='<a  class="'+cssSt+'ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-c gra_but" data-inline="true" data-role="button" href="#" onclick = delortakeorder("delivery") data-theme="b"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"><i class="delive_ic"></i>'+appData.GlobalConfig.delivery_label+'</span></span></a>';
			
		}
		if(buttonArray[0]==1) {			
			htmlIn+='<a  class="ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-c gra_but" data-inline="true" data-role="button" href="#" onclick=delortakeorder("takeaway") data-theme="b"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"><i class="takeaw_ic"></i>'+appData.GlobalConfig.takeaway_label+'</span></span></a>';
			
		}
		if(appData.AppConfig.see_the_menu_btn=='A') {
			htmlIn+='<a rel="external" data-role="button" href="showMenu.html" data-theme="c" class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-c gra_but"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text add_cart_txt">'+appData.GlobalConfig.see_the_menu_label+'</span></span></a>';
		}
	
		
		$('#employeeList').append(htmlIn);		
}

	function delortakeorder(val) {
		window.localStorage.setItem('takeordelivry',JSON.stringify(val));
		window.location.href='showMenu.html';
	}
		