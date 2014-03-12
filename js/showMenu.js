if(dataAppConfig==null && resDatavl==null) {
	window.location.href='index.html';
}
$("#pageLoader").show();
//alert(catId);
if(catId!=null) {
	$('#checkOutButtonId').hide();
	$('#addCartButtonId').hide();
	$('#addMoreItemButtonId').hide();
	$('#MenuCatID').hide();
	//$('#services').live('pageshow', function(event) {
		//if(checkConnection()) {
			getMenuList();
		//}
	//});
		
} else if(itemId!=null) {	
	// need to set show when online order enabled
	$('#checkOutButtonId').hide();
	$('#addCartButtonId').hide();
	$('#addMoreItemButtonId').hide();
	$('#MenuCatID').hide();
	//$('#services').live('pageshow', function(event) {
		//if(checkConnection()) {
			getMenuItemList();	
		//}
	//});
	
} else {
	$('#MenuCatID').show();
	$('#checkOutButtonId').hide();
	$('#addCartButtonId').hide();
	$('#addMoreItemButtonId').hide();
	//$('#services').live('pageshow', function(event) {
		//if(checkConnection()) {			
			getMenuTab();
			getMenuCatList();
		//}
	//});
}


$("#checkOutButtonId").click(function() {
	var carDataGet = window.localStorage.getItem('carDatas');
	
	
	if(carDataGet!=null) {		
		window.location.href='checkout.html';		
	} else {
		alert("Please add item to cart");
	}
});

$.ajaxSetup({ cache: false });

function getMenuTab() {
	$.getJSON(serviceURL+'tab/'+store_id+'/'+restId, function(data) {		
		
		//alert(JSON.stringify(data));
		var tabs = data.TabInfo;	
		
		//alert(tabs);
		if(tabs!="") {
			tabHtml='';
			$.each(tabs, function(index, tab) {
				//alert(index);					
				tabHtml+='<a class="ui-btn ui-mini" href="showMenu.html?tabId='+tab.cat_id+'" rel="external">' + tab.category_name + '</a>';
			});
			$('#MenuCatID').html(tabHtml);
		} else {
			headerHtml('Menu');
			$('#menuList').append('<li class="ui-li-has-thumb"><a class="ui-btn" href="#" rel="external">Menu is not available.</a></li>');
		}
		//headerHtml(data.MenuInfo.category_name);		
		//$('#menuList').listview('refresh');
		
	});
}

function getMenuCatList() {
	$.getJSON(serviceMenuURL, function(data) {		
		$('#menuList li').remove();		
		//alert(JSON.stringify(data.MenuInfo.category_name));
		var cats = data.CatInfo;	
		//alert(totMenCnt);
		if(cats!=null) {
			var totMenCnt=cats.length-1;
			$.each(cats, function(index, cat) {
				//alert(index);
				strCat=cat.subcat_name;
				if(index==0) { fir='ui-first-child';} else if(totMenCnt==index && dataAppConfig.AppConfig.deal_status=='B'){fir='ui-last-child';}else{ fir='';}
				$('#menuList').append('<li class="ui-li-has-thumb '+fir+'"><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="showMenu.html?catId='+cat.sub_id+'&tabId='+menuId+'" rel="external"><img src="'+itemImgURL+(cat.subcat_image!=""? cat.subcat_image:defaultImgURL)+'"><h2>' + strCat+'</h2></a></li>');
			});
			if(dataAppConfig.AppConfig.deal_status=='A') {
				$('#menuList').append('<li class="ui-li-has-thumb ui-last-child"><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="deal.html?tabId='+menuId+'" rel="external"><img src="'+dataAppConfig.AppConfig.deal_img+'" ><h2>Deals</h2></a></li>');
			}
			headerHtml(data.MenuInfo.category_name);	
			$("#pageLoader").hide();
			//$('#menuList').listview('refresh');
		} else {
			headerHtml(data.MenuInfo.category_name);
			$('#menuList').append('<li class="ui-li-has-thumb ui-last-child"><span style="color:#ff0000">No Category Found</span></li>');
			$("#pageLoader").hide();
		}
		
	});
	
}
function getMenuList() {
	
	//alert(serviceURL+'itemlist/'+store_id+'/'+catId);
	$.getJSON(serviceURL+'itemlist/'+catId, function(data) {		
		$('#menuList li').remove();		
		//alert(data);
		var items = data.ItemList;
		var subCats = data.SubInfo;
		
		if(subCats!=null) {
			$( "#menuList" ).removeClass('cremove');
			var totMenCnt1=subCats.length-1;
			//alert(totMenCnt1);
			$.each(subCats, function(index, subCat) {
				//alert(index);
				if(index==0 && totMenCnt1!=index) { fir1='ui-first-child';} else if(totMenCnt1==index){fir1='ui-last-child';}else{ fir1='';}
				//alert(fir1);
				strSubCat=subCat.subcat_name;
				$('#menuList').append('<li class="ui-li-has-thumb '+fir1+'"><a class="ui-btn ui-btn-icon-right ui-icon-carat-r"  href="showMenu.html?catId='+subCat.sub_id+'&tabId='+menuId+'" rel="external"><img src="'+itemImgURL+(subCat.subcat_image!=""? subCat.subcat_image:defaultImgURL)+'"><h2>' + strSubCat+'</h2></a></li>');
			});		
			headerHtml(data.MenuTitle);
			$("#pageLoader").hide();
		} else {	
			$( "#menuList" ).addClass('cremove');
			if(items.length>0) {
				var totMenCnt2=items.length-1;
				$.each(items, function(index, item) {
					if(index==0 && totMenCnt2==index) { fir2='ui-first-child';} else if(totMenCnt2==index){fir2='ui-last-child';}else{ fir2='';}
					strDesc=item.item_desc;
					strItemName=item.item_name;
					$('#menuList').append('<li class="ui-li-has-thumb '+fir2+'"><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="showMenu.html?itemId='+item.item_id+'&tabId='+menuId+'" rel="external"><img src="'+itemImgURL+(item.item_img!=""? item.item_img:defaultImgURL)+'" ><h2 class="myleft">'+strItemName+'</h2><h3 class="mylefth3">$'+ item.item_selling_price + '</h3><p >'+ strDesc+ '</p ></a></li>');
				});
				$("#pageLoader").hide();
			} else {
				$('#menuList').append('<li><span style="color:#ff0000">No Items Found</span></li>');
				$("#pageLoader").hide();
			}
			headerHtml(data.MenuTitle);
		}
				
		//$('#menuList').listview('refresh');
	});
}

function getMenuItemList() {
	htmlVal="";
	//alert(serviceURL+'itemdet/'+itemId);
	$.getJSON(serviceURL+'itemdet/'+itemId, function(data) {
		$('#menuList').hide();
		
		//alert(data);
		var itemDet = data.ItemDet;
		var itemOptionDets = data.itemOption;
	
		//alert('item page');
		
		htmlVal+='<div class="confirmation">';
		htmlVal+='<h2>'+itemDet.item_name+'</h2>';
			htmlVal+=' <div class="row_div">';
				htmlVal+='<img src="'+itemImgURL+(itemDet.item_img!=""? itemDet.item_img:defaultImgURL)+'" alt="">';
			htmlVal+='</div>';  
		
			htmlVal+='<p>'+itemDet.item_desc+'</p>';   
			// hidden fields
			htmlVal+='<input type="hidden" value="'+itemDet.item_name+'" name="item_name"  id="item_name"><input type="hidden" value="'+itemDet.item_id+'" name="item_id"  id="item_id"><input type="hidden" value="'+itemDet.item_desc+'" name="item_desc" id="item_desc"><input type="hidden" value="'+itemDet.item_img+'" name="item_img"  id="item_img">';
		//htmlVal+='</div>';			
		if(itemDet.option=='N') {
			
			
			htmlVal+='<p> <h3>Price  <span>$'+ itemDet.item_selling_price + '/-</span></h3>';
				
			
			/* -- modi 4 /12----
			
			htmlVal+='<div class="item-wrap clearfix">';
				 
				htmlVal+='<div class="item-left price-txt"><h2>Selling Price</h2></div>';
		
				htmlVal+='<div class="item-right"><h2 class="red-txt">$ '+ itemDet.item_selling_price + '/-</h2></div>';*/
				
				// hidden fields
				htmlVal+='<input type="hidden" value="'+itemDet.item_selling_price+'" name="item_selling_price" id="item_selling_price"><input type="hidden" value="'+itemDet.option+'" name="price_type" id="price_type">';
		
			htmlVal+='</p>';
		} else {
			
			var carDataGetRadioval = window.localStorage.getItem('carDatas');
			if(carDataGetRadioval!=null) {
				var carDataGetRadio = JSON.parse(carDataGetRadioval);
				var priceSelect=jQuery.map(carDataGetRadio.items, function(obj) {
					if(obj.item_id === itemDet.item_id )
						 return obj.item_price; // or return obj.name, whatever.
				});
			} else {
				var priceSelect="";
			}
			
			htmlVal+='<div class="clearfix infowarps">';
			htmlVal+='<div class="row_div">';
            htmlVal+='<h2>Size</h2></div>';
				$.each(itemOptionDets, function(index, itemOpt) {
					if(priceSelect!="" ) {
						priceSelected=priceSelect==itemOpt.price ? "checked" : "";
						//labelStat=priceSelect==itemOpt.price ? 'ui-radio-on' : "ui-radio-off";;
					} else {
						priceSelected="";
						//labelStat='ui-radio-off';
						
					}
					//alert(labelStat)
					OptionName=itemOpt.option_name;			
					htmlVal+='<div class="row_div"><p class="ingre_label"><input type="radio" name="option_price" id="'+itemOpt.option_name+'" value="'+itemOpt.price + '" data-cacheval="true" onclick=\'setPriceType("'+OptionName+'")\' '+priceSelected+'/> '+itemOpt.option_name+'</p>';
					htmlVal+='<p class="info_right">$'+ itemOpt.price + '</p>';					
					htmlVal+='</div>';	
					
				});
				
				// hidden fields
				htmlVal+='<input type="hidden" value="'+itemDet.option+'" name="price_type" id="price_type">';					
				htmlVal+='<input type="hidden" value="" name="price_type_name" id="price_type_name">';					
			
		} 
		htmlVal+=' </div>';
		$('#itemDetList').html(htmlVal);
		
		headerHtml(itemDet.item_name);
		$("#pageLoader").hide();
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
		var carDataGetval = window.localStorage.getItem('carDatas');
			
		if(carDataGetval!=null) {
			var carDataGet = JSON.parse(carDataGetval);
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
