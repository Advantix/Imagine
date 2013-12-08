if(dataAppConfig==null) {
	window.location.href='index.html';
}
//alert(catId);
if(catId!=null) {
	$('#checkOutButtonId').hide();
	$('#addCartButtonId').hide();
	$('#addMoreItemButtonId').hide();
	
	$('#services').live('pageshow', function(event) {
		//if(checkConnection()) {
			getMenuList();
		//}
	});
		
} else if(itemId!=null) {	
	
	if(itemType!=null) {
		$('#checkOutButtonId').hide();	
		$('#addMoreItemButtonId').hide();
	}
	$('#services').live('pageshow', function(event) {
		//if(checkConnection()) {
			getMenuItemList();	
		//}
	});
	
} else {
	
	$('#checkOutButtonId').hide();
	$('#addCartButtonId').hide();
	$('#addMoreItemButtonId').hide();
	$('#services').live('pageshow', function(event) {
		//if(checkConnection()) {
			getMenuCatList();
		//}
	});
}


$("#checkOutButtonId").click(function() {
	var carDataGet = JSON.parse(window.localStorage.getItem('carDatas'));
	var dealItemsGet = JSON.parse(window.localStorage.getItem('dealItemsId'));
	
	if(carDataGet!=null) {
		if(dealItemsGet!=null) {
			dealSelAllGet=window.localStorage.getItem('dealSelAll');
			if(dealSelAllGet==1) {
				window.location.href='checkout.html';
			} else {
				alert('Please add all the deal item to cart');
			}
		} else {
			window.location.href='checkout.html';
		}
	} else {
		alert("Please add item to cart");
	}
});

$.ajaxSetup({ cache: false });
function getMenuCatList() {
	$.getJSON(serviceMenuURL, function(data) {		
		$('#employeeList li').remove();		
		//alert(data);
		var cats = data.CatInfo;
		$.each(cats, function(index, cat) {
			
			$('#employeeList').append('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="showMenu.html?catId='+cat.cat_id+'" class="ui-link-inherit" rel="external"><img src="'+itemImgURL+(cat.category_image!=""? cat.category_image:defaultImgURL)+'" style="padding:5px;">&nbsp;' + cat.category_name + '&nbsp;<span style="font-size:11px; display:block; margin-left:4px; margin-top:4px;">('+ cat.category_desc + ')</span></a></div><span class="ui-icon ui-icon-arrow-r"></span></div></li>');
		});
				
		$('#employeeList').listview('refresh');
	});
}
function getMenuList() {
	//alert(serviceURL+'itemlist/'+store_id+'/'+catId);
	$.getJSON(serviceURL+'itemlist/'+store_id+'/'+catId, function(data) {		
		$('#employeeList li').remove();		
		//alert(data);
		var items = data.ItemList;
		var carDataGetDeal = JSON.parse(window.localStorage.getItem('dealItemsId'));
		var carDataGetNorOrd = JSON.parse(window.localStorage.getItem('carDatas'));
		$.each(items, function(index, item) {
			if(carDataGetDeal!=null && carDataGetNorOrd!=null) {
				var dealFlag=1;
			} else if(carDataGetNorOrd!=null){
				var dealFlag=2;
			} else {
				var dealFlag=0;
			}
			dealItemsId=item.deal_items_id=="" ? null :1;
			$('#employeeList').append('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="#" class="ui-link-inherit" rel="external" onclick="showDealCartAlert('+item.item_id+','+dealFlag+','+dealItemsId+')"><img src="'+itemImgURL+(item.item_img!=""? item.item_img:defaultImgURL)+'" style="padding:5px;">&nbsp;' + item.item_name + '&nbsp;<span style="font-size:11px; display:block; margin-left:4px; margin-top:4px;">('+ item.item_desc + ')</span></a></div><span class="ui-icon ui-icon-arrow-r"></span></div></li>');
		});
				
		$('#employeeList').listview('refresh');
	});
}


function showDealCartAlert(itemId,dealFlag,dealItemsId) {
	var carDataGetAlert = JSON.parse(window.localStorage.getItem('carDatas'));
	//var dealIdAlert;
	if(carDataGetAlert!=null) {
		var dealIdAlert=jQuery.map(carDataGetAlert.items, function(obj) {
			
			if(obj.deal_id == itemId) {
				//alert(obj.deal_id+":"+itemId);
				return obj.deal_id; // or return obj.name, whatever.
			}
		});
	}
	//alert(dealIdAlert);
	if(dealFlag==0) {
		if(dealItemsId!=null) {
			window.location.href='showMenu.html?itemId='+itemId;
		} else {
			window.location.href='showMenu.html?itemId='+itemId;
		}
	} else if(dealFlag==1) {
		if(dealItemsId!=null && dealIdAlert==itemId) {
			window.location.href='showMenu.html?itemId='+itemId;
		} else {
			alert('Deal items are in pending order list! please complete deal order or clear the cart to proceed to add this item.');
		}
	}else if(dealFlag==2) {
		if(dealItemsId==null) {
			window.location.href='showMenu.html?itemId='+itemId;
		} else {
			alert('Cart items are in pending order list! please complete order or clear the cart to proceed to add this item.');
		}
	}
}


function getMenuItemList() {
	htmlVal="";
	//alert(serviceURL+'itemdet/'+itemId);
	$.getJSON(serviceURL+'itemdet/'+itemId, function(data) {
		$('#employeeList').hide();
		
		//alert(data);
		var itemDets = data.ItemDet;
		$.each(itemDets, function(index, itemDet) {
			//alert('item page');
			htmlVal+='<h2>'+itemDet.item_name+'</h2>';
			htmlVal+='<div class="item-wrap clearfix">';
				htmlVal+=' <div class="item-image">';
					htmlVal+='<img src="'+itemImgURL+(itemDet.item_img!=""? itemDet.item_img:defaultImgURL)+'" alt="">';
				htmlVal+='</div>';            
				htmlVal+='<div class="item-desc"><p>'+itemDet.item_desc+'</p></div>';   
				// hidden fields
				htmlVal+='<input type="hidden" value="'+itemDet.item_name+'" name="item_name"  id="item_name"><input type="hidden" value="'+itemDet.item_id+'" name="item_id"  id="item_id"><input type="hidden" value="'+itemDet.item_desc+'" name="item_desc" id="item_desc"><input type="hidden" value="'+itemDet.item_img+'" name="item_img"  id="item_img">';
			htmlVal+='</div>';
			if(itemDet.item_small_price==0 || itemDet.deal_items_id!="") {
				
				if(itemType==null) {
					window.localStorage.removeItem('deal_id');
					window.localStorage.removeItem('deal_name');
				}
				htmlVal+='<div class="item-wrap org_price clearfix" style=" background:#eeeeee; margin-top:20px;">';
                   
					htmlVal+='<div class="item-left price-txt"><h2 style="color:#000;">Original Price</h2></div>';            
					htmlVal+='<div class="item-right"><h2 style="color:red;"><span style="color:#000; font-size:14px;">AUD</span> '+ itemDet.item_org_price + '/-</h2></div>';
					htmlVal+='</div>';
				
				/* -- modi 4 /12----
				
				htmlVal+='<div class="item-wrap clearfix">';
                     
					htmlVal+='<div class="item-left price-txt"><h2>Selling Price</h2></div>';
            
					htmlVal+='<div class="item-right"><h2 class="red-txt">$ '+ itemDet.item_selling_price + '/-</h2></div>';
					
					// hidden fields
					htmlVal+='<input type="hidden" value="'+itemDet.item_org_price+'" name="item_org_price" id="item_org_price"><input type="hidden" value="'+itemDet.item_selling_price+'" name="item_selling_price" id="item_selling_price"><input type="hidden" value="single" name="price_type" id="price_type">';
			
				htmlVal+='</div>';*/
			} else if(itemDet.deal_items_id==""){
			
				if(itemType==null) {
					window.localStorage.removeItem('deal_id');
					window.localStorage.removeItem('deal_name');
				}
				var carDataGetRadio = JSON.parse(window.localStorage.getItem('carDatas'));
				if(carDataGetRadio!=null) {
					var priceSelect=jQuery.map(carDataGetRadio.items, function(obj) {
						if(obj.item_id === itemDet.item_id )
							 return obj.item_price; // or return obj.name, whatever.
					});
				} else {
					var priceSelect="";
				}
				
				if(priceSelect!="" ) {
					smallChe=priceSelect==itemDet.item_small_price ? "checked" : "";
					largeChe=priceSelect==itemDet.item_large_price ? "checked" : "";
					familyChe=priceSelect==itemDet.item_family_price ? "checked" : "";
				} else {
					smallChe="checked";
					largeChe="";
					familyChe="";
				}

				$('#dealItemList').hide();	
				htmlVal+='<div class="ui-grid-b price-cat" style="margin-top:10px;">';
					htmlVal+='<div class="ui-block-a"><div class="ui-bar ui-bar-a"><h2>Small</h2></div></div>';
					htmlVal+='<div class="ui-block-b"><div class="ui-bar ui-bar-a" ><h2>Large</h2></div></div>';
					htmlVal+='<div class="ui-block-c"><div class="ui-bar ui-bar-a"><h2>Family</h2></div></div>';
				htmlVal+='</div>';
				
				
				htmlVal+='<div class="ui-grid-b price-cat">';
					htmlVal+='<div class="ui-block-a"><div class="ui-bar ui-bar-c" >';
					htmlVal+='<div class="small-big"> <input type="radio" name="option_price" id="option_price_small" value="'+ itemDet.item_small_price + '" onclick="setPriceType(\'small\')"  '+smallChe+'/><span>$ '+ itemDet.item_small_price + '</span></div></div></div>';			
					
					htmlVal+='<div class="ui-block-b"><div class="ui-bar ui-bar-c" >';
					htmlVal+='<div class="small-big"> <input type="radio" name="option_price" id="option_price_large" value="'+ itemDet.item_large_price + '"  onclick="setPriceType(\'large\')" '+largeChe+'/><span>$ '+ itemDet.item_large_price + '</span></div></div></div>';				
					
					htmlVal+='<div class="ui-block-c"><div class="ui-bar ui-bar-c">';
					htmlVal+='<div class="small-big"> <input type="radio" name="option_price" id="option_price_family" value="'+ itemDet.item_family_price + '" onclick="setPriceType(\'family\')" '+familyChe+'/><span>$ '+ itemDet.item_family_price + '</span></div></div></div>';		

					// hidden fields
					htmlVal+='<input type="hidden" value="small" name="price_type" id="price_type">';					
				htmlVal+='</div>';
			} 
			$('#itemDetList').html(htmlVal);
			if(itemDet.deal_items_id!="" && itemType==null){
				$('#dealItemList li').remove();	
				var dealItemDets = data.dealItems;
				window.localStorage.setItem('dealItemDetsFrmDB',JSON.stringify(dealItemDets)); // store deal items local storage	
				var carDataGetDeal = JSON.parse(window.localStorage.getItem('dealItemsId'));
				window.localStorage.setItem('dealSelAll',1); // store local storage
				$.each(dealItemDets, function(index, dealItem) {
					if(carDataGetDeal!=null) {
						var dealSel=jQuery.map(carDataGetDeal.items, function(obj) {
							if(obj.item_id === dealItem.item_id)
								 return obj.item_id; // or return obj.name, whatever.
						});
					} else {
						dealSel="";
					}
					//alert(dealSel);
					if(dealSel!="") {
						dealSelSpan='ui-icon-checkbox-on';
					} else {
						dealSelSpan='ui-icon-checkbox-off';
					}
					
					if(dealSel=="") {
						window.localStorage.setItem('dealSelAll',0); // store local storage
					} 
					//alert(dealItem.item_id);
					$('#dealItemList').append('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="showMenu.html?type=deal&itemId='+dealItem.item_id+'" class="ui-link-inherit" rel="external">' + dealItem.item_name + '&nbsp;<span style="font-size:11px">('+ dealItem.item_desc + ')</span></a></div><span class="ui-icon '+dealSelSpan+'"></span></div></li>');
				});
				
				
				window.localStorage.setItem('deal_id',itemId); // store local storage
				window.localStorage.setItem('deal_name',itemDet.item_name); // store local storage
				
				
				$('#dealItemList').listview('refresh');
				$("#addCartButtonId").hide();
				$("#addMoreItemButtonId").hide();
			}
			
			
		});
	});
}

// Add to cart Post	
$("#addCartButtonId").click(function() {
	
	priceType=$('#price_type').val();
	if(priceType=='single') {
		itemPrice=$('#item_selling_price').val();
	} else {
		var selectedVal = "";
		var selected = $("input[type='radio'][name='option_price']:checked");
		if (selected.length > 0) {
			selectedVal = selected.val();
		}		
		itemPrice=selectedVal
	}
	
	var dealId = window.localStorage.getItem('deal_id');
	
	if(dealId!=null) {
		dealItemGet=JSON.parse(window.localStorage.getItem('dealItemsId'));
		
		if(dealItemGet!=null) {
			dealItemGet.items.push({"item_id": $('#item_id').val()});
		} else {
			var dealItemGet={"items":[{"item_id": $('#item_id').val()}]};
		}
		window.localStorage.setItem('dealItemsId',JSON.stringify(dealItemGet)); // store local storage	
				
		dealId=dealId;
	} else {
		dealId="0";
	}
	
	var carDataGet = JSON.parse(window.localStorage.getItem('carDatas'));
		
	if(carDataGet!=null) {
		
		var itemExiIndexId=0;
		var itemExiId=0;
		var itemDets = carDataGet.items;
		$.each(itemDets, function(index, itemDet) {			
			//alert(itemDet.item_id);
			if(itemDet.item_id==$('#item_id').val()) {
				if(itemDet.item_price!=itemPrice) {
					itemExiIndexId=index;
					itemExiId=2;
					return false;
				} else {
					itemExiId=1;
					return false;
				}				
			}
		});
		if(itemExiId==0){
			carDataGet.items.push({
					"item_id": $('#item_id').val(),
					"deal_id": dealId,
					"item_name":$('#item_name').val(),
					"item_desc":$('#item_desc').val(),
					"item_img":$('#item_img').val(),
					"item_price":itemPrice,
					"price_type":priceType
					});
			if(dealId==0) {
				alert("Item added sucess!");
			} else {
				alert("Item added sucess!");
				window.location.href='showMenu.html?itemId='+dealId;
			}
		} else if(itemExiId==2){
		
			var itemRemoveDeal = carDataGet.items;
			itemRemoveDeal.splice(itemExiIndexId, 1);
			
			carDataGet.items.push({
					"item_id": $('#item_id').val(),
					"deal_id": dealId,
					"item_name":$('#item_name').val(),
					"item_desc":$('#item_desc').val(),
					"item_img":$('#item_img').val(),
					"item_price":itemPrice,
					"price_type":priceType
					});
			if(dealId==0) {
				alert("Item updates sucess!");
			} else {
				alert("Item updates sucess!");
				window.location.href='showMenu.html?itemId='+dealId;
			}
		} else {
			if(dealId!=0) {
				if(confirm("Item already exist! do you want to go back to deal selection ? ")) {
					window.location.href='showMenu.html?itemId='+dealId;
				}
			} else {
				alert("Item already exist!");
			}
			
		}
	} else {
		var carDataGet={"items":[{
		"item_id": $('#item_id').val(),
		"deal_id": dealId,
		"item_name":$('#item_name').val(),
		"item_desc":$('#item_desc').val(),
		"item_img":$('#item_img').val(),
		"item_price":itemPrice,
		"price_type":priceType
		}]};
		if(dealId==0) {
			alert("Item added sucess!");
		} else {
			alert("Item added sucess!");
			window.location.href='showMenu.html?itemId='+dealId;
		}
	}
	//alert(cartData.items);
	
	window.localStorage.setItem('carDatas',JSON.stringify(carDataGet)); // store local storage	
	
	/*var carDataGetAfter = JSON.parse(window.localStorage.getItem('carDatas'));
	
	alert(carDataGetAfter.items);
	var itemDetsAf = carDataGetAfter.items;
		$.each(itemDetsAf, function(index, itemDetaf) {
			alert(itemDetaf.item_id);
		});*/
});

function setPriceType(prType) {
	$('#price_type').val(prType);
}