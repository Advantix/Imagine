$("#pageLoader").show();
//$('#typography').live('pageshow', function(event) {	
	//if(checkConnection()) {
		var resDatavl = window.localStorage.getItem('RestInfoDet');//alert(resDatavl);
		if(resDatavl!=null) {
			var ref = 1;
			/*$("#dealDivId").show();
			$("#employeeList").show();*/
			//showHomePage();
			showDashPage();
		} else {
			/*$("#dealDivId").hide();
			$("#employeeList").hide();*/
			var ref = 0;
		}
		getAppConfig();
	//}
//});
$.ajaxSetup({ cache: false });
function showDashPage() {
	
	var appData = JSON.parse(window.localStorage.getItem('configData'));
	//var homeDash = JSON.parse(window.localStorage.getItem('homeDash'));
	var htmlIn='';
	buttonArray=resData.service_options;
	buttonArray=buttonArray.split('-');
	//alert(serviceURL+'home/'+restId);
	$.getJSON(serviceURL+'home/'+restId, function(data) {	
				
				//alert(JSON.stringify(data));
				dealDef=data.DealMenuList;
				dealDefLen=dealDef.length;//alert(dealDefLen);
				dealCat=data.DefaultCat;
				dealCatLen=dealCat.length;//alert(dealCatLen);
				dealMenuDeal=data.DefaultMenu;
				
				htmlHome='';
				if(dealDefLen>0) {
					htmlHome='<div class="menu-choose-wp">';
						htmlHome+='<div class="menu-img"><img src="'+itemImgURL+dealDef[0]['item_img']+'" alt=""></div>';
						htmlHome+='<p class="menu-title"><a href="deal.html?delitemId='+dealDef[0]['item_id']+'" rel="external">'+dealDef[0]['item_name']+'</a></p>';
					htmlHome+='</div>';
					
					htmlHome+='<div class="menu-choose-wp" style="margin:0">';
						htmlHome+='<div class="menu-img"><img src="'+itemImgURL+dealDef[1]['item_img']+'" alt=""></div>';
						htmlHome+='<p class="menu-title"><a href="deal.html?delitemId='+dealDef[1]['item_id']+'" rel="external">'+dealDef[1]['item_name']+'</a></p>';
					htmlHome+='</div>';
				}
				htmlHome+='<div class="menu-choose-wp" >';
					htmlHome+='<div class="menu-img"><img src="images/reservation.jpg" alt=""></div>';
					htmlHome+='<p class="menu-title"><a href="dinein.html" rel="external">Reservation</a></p>';
				htmlHome+='</div>';
								
				htmlHome+='<div class="menu-choose-wp" style="margin:0">';
					htmlHome+='<div class="menu-img"><img src="images/menu.jpg" alt=""></div>';
					htmlHome+='<p class="menu-title"><a href="showMenu.html" rel="external">Menu</a></p>';
				htmlHome+='</div>';
				
				if(dealCatLen>0) {
					htmlHome+='<div class="menu-choose-wp">';
						htmlHome+='<div class="menu-img"><img src="'+itemImgURL+dealCat[0]['subcat_image']+'" alt=""></div>';
						htmlHome+='<p class="menu-title"><a href="showMenu.html?catId='+dealCat[0]['sub_id']+'&tabId='+dealCat[0]['menu_id']+'" rel="external">'+dealCat[0]['subcat_name']+'</a></p>';
					htmlHome+='</div>';
				}
				
				if(dealMenuDeal!=null) {
					if(dealCatLen>0) {st='style="margin:0"'}else{st='';}
					htmlHome+='<div class="menu-choose-wp" '+st+'>';
						htmlHome+='<div class="menu-img"><img src="'+itemImgURL+dealMenuDeal.category_image+'" alt=""></div>';
						htmlHome+='<p class="menu-title"><a href="deal.html?tabId='+dealMenuDeal.id+'" rel="external">'+dealMenuDeal.category_name+'</a></p>';
					htmlHome+='</div>';
				}
				htmlHome+='<div class="menu-choose-wp">';
					htmlHome+='<div class="menu-img"><img src="images/help.jpg" alt=""></div>';
					htmlHome+='<p class="menu-title"><a href="help.html" rel="external">Help</a></p>';
				htmlHome+='</div>';
				
				htmlHome+='<div class="menu-choose-wp" style="margin:0">';
					htmlHome+='<div class="menu-img"><img src="images/location.jpg" alt=""></div>';
					htmlHome+='<p class="menu-title"><a href="restaurant_details.html" rel="external">Location</a></p>';
				htmlHome+='</div><span class="menu-choose-wp"></span>';
				
				$('#homeDashId').html(htmlHome);	
				
			});
	
	$("#pageLoader").hide();
	headerHtml(resData.restaurant_name);
	
}
function showHomePage() {
		$("#dealDivId").hide();
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
				if(items.length>0) {
					$("#dealDivId").show();
					$.each(items, function(index, item) {
						//alert(item.item_img);
						dealItemsId=item.deal_items_id=="" ? null :1;
						 $('#slider4').append('<li><a href="deal.html?delitemId='+item.item_id+'" rel="external"><img src="'+itemImgURL+(item.item_img!=""? item.item_img:defaultImgURL)+'" alt=""></a></li>');		
						
					});
				} else {
					$("#dealDivId").hide();
				}
			});
		}
		
		if(buttonArray[1]==1) {
			
				htmlIn+='<button class="ui-btn ui-btngrey" onclick = delortakeorder("delivery")>'+appData.GlobalConfig.delivery_label+'</button>';
				//htmlIn+='<a  class="'+cssSt+'ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-c gra_but" data-inline="true" data-role="button" href="#" onclick = delortakeorder("delivery") data-theme="b"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"><i class="delive_ic"></i>'+appData.GlobalConfig.delivery_label+'</span></span></a>';
			
		}
		if(buttonArray[0]==1) {		
			htmlIn+='<button class="ui-btn ui-btngrey" onclick = delortakeorder("takeaway")>'+appData.GlobalConfig.takeaway_label+'</button>';
			//htmlIn+='<a  class="ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-c gra_but" data-inline="true" data-role="button" href="#" onclick=delortakeorder("takeaway") data-theme="b"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"><i class="takeaw_ic"></i>'+appData.GlobalConfig.takeaway_label+'</span></span></a>';
			
		}
		if(buttonArray[2]==1) {		
			htmlIn+='<button class="ui-btn ui-btngrey" onclick = delortakeorder("DineIn")>'+appData.GlobalConfig.dinein_label+'</button>';
			//htmlIn+='<a  class="ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-c gra_but" data-inline="true" data-role="button" href="#" onclick=delortakeorder("takeaway") data-theme="b"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"><i class="takeaw_ic"></i>'+appData.GlobalConfig.takeaway_label+'</span></span></a>';
			
		}
		if(appData.AppConfig.see_the_menu_btn=='A') {
			htmlIn+='<button class="ui-btn ui-btngrey" onclick = delortakeorder("ShowMenu")>'+appData.GlobalConfig.see_the_menu_label+'</button>';
			//htmlIn+='<a rel="external" data-role="button" href="showMenu.html" data-theme="c" class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-c gra_but"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text add_cart_txt">'+appData.GlobalConfig.see_the_menu_label+'</span></span></a>';
		}
	
		
		$('#employeeList').append(htmlIn);	
		headerHtml(resData.restaurant_name);
}

	function delortakeorder(val) {
		window.localStorage.setItem('takeordelivry',JSON.stringify(val));
		if(val=='DineIn') {
			window.location.href='dinein.html';
		} else {
			window.location.href='showMenu.html';
		}
	}
	
function getAppConfig() {
		
		data= window.localStorage.getItem('configData'); 
		//window.localStorage.setItem('configData',JSON.stringify(data)); // store local storage		
		if(data!==null) {	
			var data = JSON.parse(data);
			$("#bodyId").css("background-image", "url("+data.AppConfig.bg_image+")");
			$("#bodyId").css("background-repeat", "repeat-x");
			$("#bodyId").css("background-position", "top");
			$("#bodyId").css("background-color", "#000");
		
			
			htmlOption='<select onchange="setResLoc(this.value,2)"><option>--Select Restaurant Location---</option>';
			var rest = data.RestInfo;
			var restCnt = rest.length;
			//alert(restCnt);
			if(restCnt>1) {
				$('#resLocationId').show();
				$.each(rest, function(index, res) {
					var restDetval = window.localStorage.getItem('RestInfoDet');
					if(restDetval!=null) {
						var restDet = JSON.parse(restDetval);
						if(restDet.id==res.id) {
							htmlOption+='<option value='+index+' selected>'+res.restaurant_name+'('+res.restaurant_location+')</option>';
						} else {
							htmlOption+='<option value='+index+'>'+res.restaurant_name+'('+res.restaurant_location+')</option>';
						}
					} else {
						htmlOption+='<option value='+index+'>'+res.restaurant_name+'('+res.restaurant_location+')</option>';
						$('#homeButtonId').hide();
					}
					
				});
				htmlOption+='</select>';
				$("#pageLoader").hide();
				$('#resLocationId').html(htmlOption);
			} else {
				$('#resLocationId').hide();
				$("#pageLoader").hide();
				setResLoc(0,0);
			}
		
		}
		if(resData==null) {
			if(dataAppConfig!=null) {
				headerHtml(dataAppConfig.AppConfig.store_name);
			} 
		} else {
			headerHtml(resData.restaurant_name);
		}
}
function setResLoc(restId,refVa) {
	
	$("#pageLoader").show();
	window.localStorage.setItem('RestInfoDetIndex',restId); // store local storage
	var restDet = JSON.parse(window.localStorage.getItem('configData'));
	window.localStorage.setItem('RestInfoDet',JSON.stringify(restDet.RestInfo[restId])); // store local storage
	//alert(ref+"::"+refVa);
	if(ref==refVa) {
		//alert(ref+"::"+refVa);
		window.location.href='index.html';		
	} else if(refVa==2){
		window.location.href='index.html';		
	}
}	