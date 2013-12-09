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
	
	
	if(carDataGet!=null) {		
		window.location.href='checkout.html';		
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
			
			$('#employeeList').append('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="showMenu.html?catId='+cat.sub_id+'" class="ui-link-inherit" rel="external"><img src="'+itemImgURL+(cat.subcat_image!=""? cat.subcat_image:defaultImgURL)+'" style="padding:5px;">&nbsp;' + cat.subcat_name + '&nbsp;<span style="font-size:11px; display:block; margin-left:4px; margin-top:4px;">('+ cat.subcat_name + ')</span></a></div><span class="ui-icon ui-icon-arrow-r"></span></div></li>');
		});
				
		$('#employeeList').listview('refresh');
		$('#menulist').html('Menu Category');
	});
}
function getMenuList() {
	//alert(serviceURL+'itemlist/'+store_id+'/'+catId);
	$.getJSON(serviceURL+'itemlist/'+catId, function(data) {		
		$('#employeeList li').remove();		
		//alert(data);
		var items = data.ItemList;
		var subCats = data.SubInfo;
		
		if(subCats!=null) {
			
			$.each(subCats, function(index, subCat) {
				
				$('#employeeList').append('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="showMenu.html?catId='+subCat.sub_id+'" class="ui-link-inherit" rel="external"><img src="'+itemImgURL+(subCat.subcat_image!=""? subCat.subcat_image:defaultImgURL)+'" style="padding:5px;">&nbsp;' + subCat.subcat_name + '&nbsp;<span style="font-size:11px; display:block; margin-left:4px; margin-top:4px;">('+ subCat.subcat_name + ')</span></a></div><span class="ui-icon ui-icon-arrow-r"></span></div></li>');
			});
			$('#menulist').html('Menu Sub Category');
		} else {			
			$.each(items, function(index, item) {				
				$('#employeeList').append('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="showMenu.html?itemId='+item.item_id+'" class="ui-link-inherit" rel="external"><img src="'+itemImgURL+(item.item_img!=""? item.item_img:defaultImgURL)+'" style="padding:5px;">&nbsp;' + item.item_name + '&nbsp;<span style="font-size:11px; display:block; margin-left:4px; margin-top:4px;">('+ item.item_desc + ')</span></a></div><span class="ui-icon ui-icon-arrow-r"></span></div></li>');
			});
			$('#menulist').html('Menu Items List');
		}
				
		$('#employeeList').listview('refresh');
	});
}

function getMenuItemList() {
	htmlVal="";
	//alert(serviceURL+'itemdet/'+itemId);
	$.getJSON(serviceURL+'itemdet/'+itemId, function(data) {
		$('#employeeList').hide();
		
		//alert(data);
		var itemDet = data.ItemDet;
		var itemOptionDets = data.itemOption;
	
		//alert('item page');
		htmlVal+='<div class="titlemenu-hd">'+itemDet.item_name+'</div>';
		htmlVal+='<div class="item-wrap clearfix">';
			htmlVal+=' <div class="item-image">';
				htmlVal+='<img src="'+itemImgURL+(itemDet.item_img!=""? itemDet.item_img:defaultImgURL)+'" alt="">';
			htmlVal+='</div>';            
			htmlVal+='<div class="item-desc"><p>'+itemDet.item_desc+'</p></div>';   
			// hidden fields
			htmlVal+='<input type="hidden" value="'+itemDet.item_name+'" name="item_name"  id="item_name"><input type="hidden" value="'+itemDet.item_id+'" name="item_id"  id="item_id"><input type="hidden" value="'+itemDet.item_desc+'" name="item_desc" id="item_desc"><input type="hidden" value="'+itemDet.item_img+'" name="item_img"  id="item_img">';
		htmlVal+='</div>';
		if(itemDet.option=='N') {
			
			
			htmlVal+='<div class="item-wrap org_price clearfix" style=" background:#eeeeee; margin-top:20px;">';
			   
				htmlVal+='<div class="item-left price-txt"><h2 style="color:#000;">Price</h2></div>';            
				htmlVal+='<div class="item-right"><h2 style="color:red;"><span style="color:#000; font-size:14px;">AUD</span> '+ itemDet.item_selling_price + '/-</h2></div>';
				htmlVal+='</div>';
			
			/* -- modi 4 /12----
			
			htmlVal+='<div class="item-wrap clearfix">';
				 
				htmlVal+='<div class="item-left price-txt"><h2>Selling Price</h2></div>';
		
				htmlVal+='<div class="item-right"><h2 class="red-txt">$ '+ itemDet.item_selling_price + '/-</h2></div>';*/
				
				// hidden fields
				htmlVal+='<input type="hidden" value="'+itemDet.item_selling_price+'" name="item_selling_price" id="item_selling_price"><input type="hidden" value="'+itemDet.option+'" name="price_type" id="price_type">';
		
			htmlVal+='</div>';
		} else {
			
			var carDataGetRadio = JSON.parse(window.localStorage.getItem('carDatas'));
			if(carDataGetRadio!=null) {
				var priceSelect=jQuery.map(carDataGetRadio.items, function(obj) {
					if(obj.item_id === itemDet.item_id )
						 return obj.item_price; // or return obj.name, whatever.
				});
			} else {
				var priceSelect="";
			}
			
			
			htmlVal+='<div class="ui-grid-b price-cat" style="margin-top:10px;">';
			styleArr=Array('a','b','c');
			$.each(itemOptionDets, function(index, itemOpt) {	
				htmlVal+='<div class="ui-block-'+styleArr[index]+'"><div class="ui-bar ui-bar-a"><h2>'+itemOpt.option_name+'</h2></div></div>';
			});
			htmlVal+='</div>';
			
			htmlVal+='<div class="ui-grid-b price-cat">';
				$.each(itemOptionDets, function(index, itemOpt) {
					if(priceSelect!="" ) {
						priceSelected=priceSelect==itemOpt.price ? "checked" : "";				
					} else {
						priceSelected="";
						
					}
					OptionName=itemOpt.option_name;
					htmlVal+='<div class="ui-block-'+styleArr[index]+'"><div class="ui-bar ui-bar-c" >';
					htmlVal+='<div class="small-big"> <input type="radio" name="option_price" id="'+itemOpt.option_name+'" value="'+itemOpt.price + '"  onclick=\'setPriceType("'+OptionName+'")\' '+priceSelected+'/><span>$ '+ itemOpt.price + '</span></div></div></div>';	
				});
				
				// hidden fields
				htmlVal+='<input type="hidden" value="'+itemDet.option+'" name="price_type" id="price_type">';					
				htmlVal+='<input type="hidden" value="" name="price_type_name" id="price_type_name">';					
			htmlVal+='</div>';
		} 
		$('#itemDetList').html(htmlVal);
		$('#menulist').html('Menu Item');
	});
}

// Add to cart Post	
$("#addCartButtonId").click(function() {
	
	priceType=$('#price_type').val();
	priceTypeName=$('#price_type_name').val();
	//alert(priceTypeName);
	if(priceType=='N') {
		itemPrice=$('#item_selling_price').val();
	} else {
		var selectedVal = "";
		var selected = $("input[type='radio'][name='option_price']:checked");
		if (selected.length > 0) {
			selectedVal = selected.val();
		}		
		itemPrice=selectedVal
		//alert(itemPrice);
	}
	if(itemPrice!="") {
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
						"deal_id":0,
						"item_name":$('#item_name').val(),						
						"item_desc":$('#item_desc').val(),
						"item_img":$('#item_img').val(),
						"item_price":itemPrice,
						"price_type":priceTypeName
						});
				alert("Item added sucess!");
				
			} else if(itemExiId==2){
			
				var itemRemoveDeal = carDataGet.items;
				itemRemoveDeal.splice(itemExiIndexId, 1);
				
				carDataGet.items.push({
						"item_id": $('#item_id').val(),		
						"deal_id":0,
						"item_name":$('#item_name').val(),
						"item_desc":$('#item_desc').val(),
						"item_img":$('#item_img').val(),
						"item_price":itemPrice,
						"price_type":priceTypeName
						});
				
				alert("Item updates sucess!");
				 
			} else {			
				alert("Item already exist!");
							
			}
		} else {
			var carDataGet={"items":[{
			"item_id": $('#item_id').val(),		
			"deal_id":0,
			"item_name":$('#item_name').val(),
			"item_desc":$('#item_desc').val(),
			"item_img":$('#item_img').val(),
			"item_price":itemPrice,
			"price_type":priceTypeName
			}]};
			
			alert("Item added sucess!");
			 
		}
		//alert(cartData.items);
		
		window.localStorage.setItem('carDatas',JSON.stringify(carDataGet)); // store local storage	
		
	} else {
		alert("Please select options");
	}
});

function setPriceType(prType) {
	//alert(prType);
	$('#price_type_name').val(prType);
}
