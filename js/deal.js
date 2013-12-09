if(dataAppConfig==null) {
	window.location.href='index.html';
}


if(delitemId!=null){
	getDealItemDet();
	
}else if(dealId!=null && chkitemid==null){
	getSingleDealItem();
	$('#checkOutButtonId').hide();
	$('#addCartButtonId').hide();
	$('#addMoreItemButtonId').hide();
}else if(chkitemid!=null && dealId!=null){
	addCartItemdet();
	$('#checkOutButtonId').hide();
	$('#addCartButtonId').show();
	$('#addMoreItemButtonId').hide();
}else{
	getDealItemList();
	$('#checkOutButtonId').hide();
	$('#addCartButtonId').hide();
	$('#addMoreItemButtonId').hide();
}
$("#checkOutButtonId").click(function() {
	var carDataGet = JSON.parse(window.localStorage.getItem('carDatas'));
	var carDataGetDeal = JSON.parse(window.localStorage.getItem('dealItemsId'));
	var dealItemDet = JSON.parse(window.localStorage.getItem('deal_item_det'));
	
	dealtotalcount = dealItemDet.deal_cat_id.split("#:#");
	deal_item_sele_page_id=dealItemDet.item_id;
	
	dealItemGetLenght=carDataGetDeal.items;
	dealItemCount=0;
	if(dealItemGetLenght!=null) {
		jQuery.map(dealItemGetLenght, function(obj) {
			if(obj.deal_main_item_id === deal_item_sele_page_id)
				++dealItemCount; // or return obj.name, whatever.
		});
	}
	
	//alert(carDataGetDeal.items.length);
	
	//alert(dealtotalcount.length);
		if(carDataGetDeal!=null) {
			if(dealtotalcount.length==dealItemCount) {
				window.location.href='checkout.html';
			} else {
				alert('Please add all the deal item to cart');
			}
		} else {
			alert('Add item to cart');
		}
	
});

function getDealItemList() {
	//alert(serviceURL+'dealitemlist/'+restId);
	$.getJSON(serviceURL+'dealitemlist/'+restId, function(data) {		
		$('#employeeList li').remove();		
		//alert(data.DealList);
		var items = data.DealList;
		$.each(items, function(index, item) {
			dealItemsId=item.deal_items_id=="" ? null :1;
			$('#employeeList').append('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="deal.html?delitemId='+item.item_id+'" class="ui-link-inherit" rel="external" ><img src="'+itemImgURL+(item.item_img!=""? item.item_img:defaultImgURL)+'" style="padding:5px;">&nbsp;' + item.item_name + '&nbsp;<span style="font-size:11px; display:block; margin-left:4px; margin-top:4px;">('+ item.item_desc + ')</span></a></div><span class="ui-icon ui-icon-arrow-r"></span></div></li>');
		});
		//onclick="showDealCartAlert('+item.item_id+','+dealFlag+','+dealItemsId+')"
		$('#employeeList').listview('refresh');
		$('#deallist').html('Deal Item List');
	});
}

function getDealItemDet() {
	htmlVal="";
	//alert(serviceURL+'itemdet/'+itemId);
	$.getJSON(serviceURL+'dealitemdet/'+delitemId, function(data) {
		$('#employeeList').hide();		
		//alert(data);
		var itemDets = data.ItemDet;
		window.localStorage.setItem('deal_item_det',JSON.stringify(itemDets[0])); // store local storage
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
			htmlVal+='<div class="item-wrap org_price clearfix" style=" background:#eeeeee; margin-top:20px;">';
                   
			htmlVal+='<div class="item-left price-txt"><h2 style="color:#000;">Price</h2></div>';            
				htmlVal+='<div class="item-right"><h2 style="color:red;"><span style="color:#000; font-size:14px;">AUD</span> '+ itemDet.item_selling_price + '/-</h2></div>';
				htmlVal+='</div>';

				/* htmlVal+='<div class="item-wrap clearfix">';				 
				htmlVal+='<div class="item-left price-txt"><h2>Selling Price</h2></div>';		
				htmlVal+='<div class="item-right"><h2 class="red-txt">$ '+ itemDet.item_selling_price + '/-</h2></div>'; */				
				// hidden fields
				htmlVal+='<input type="hidden" value="'+itemDet.item_selling_price+'" name="price" id="price">';
			
			htmlVal+='</div>';
			$('#itemDetList').html(htmlVal);
		});	
			
		var carDataGetDeal = JSON.parse(window.localStorage.getItem('dealItemsId'));			
		//alert(JSON.stringify(data.DealItemDet));
		var dealNam = data.DealItemDet;
		$.each(dealNam, function(index, dealItem) {
			if(carDataGetDeal!=null) {
				var dealSel=jQuery.map(carDataGetDeal.items, function(obj) {
					if(obj.deal_id === dealItem.id)
						 return obj.deal_id; // or return obj.name, whatever.
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
			
			$('#dealItemList').append('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li  ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="deal.html?dealId='+dealItem.id+'" class="ui-link-inherit" rel="external">' + dealItem.deal_item_name + '&nbsp;</a></div><span class="ui-icon '+dealSelSpan+'"></span></div></li>');
		});	
			
		$('#dealItemList').listview('refresh');
		$('#deallist').html('Deal Item');
		$("#addCartButtonId").hide();
		$("#addMoreItemButtonId").hide();
		
	});
}
function getSingleDealItem() {
	htmlVal="";
	//alert(serviceURL+'singledealitem/'+dealId);
	$.getJSON(serviceURL+'singledealitem/'+dealId, function(data) {	
		//alert(data);
		$('#employeeList li').remove();	
		var itemDets1 = data.ItemDet;
		$.each(itemDets1, function(index, itemDet) {
		
				$('#employeeList').append('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="deal.html?chkitemid='+itemDet.item_id+'&dealId='+dealId+'" class="ui-link-inherit" rel="external" ><img src="'+itemImgURL+(itemDet.item_img!=""? itemDet.item_img:defaultImgURL)+'" style="padding:5px;">&nbsp;' + itemDet.item_name + '&nbsp;<span style="font-size:11px; display:block; margin-left:4px; margin-top:4px;">('+ itemDet.item_desc + ')</span></a></div><span class="ui-icon ui-icon-arrow-r"></span></div></li>');
			});
			$('#employeeList').listview('refresh');
			$('#deallist').html('Deal Items');
	});
}

function addCartItemdet() {
	htmlVal="";
	//alert(serviceURL+'itemdet/'+itemId);
	$.getJSON(serviceURL+'dealitemdet/'+chkitemid, function(data) {
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
			htmlVal+='</div>';
			$('#itemDetList').html(htmlVal);
			$('#deallist').html('Deal Item');
		});
	});
}


// Add to cart Post	
$("#addCartButtonId").click(function() {
		
	var dealItemDet = JSON.parse(window.localStorage.getItem('deal_item_det'));
	//alert(JSON.stringify(dealItemDet));
	deal_item_sele_page_id = dealItemDet.item_id;
	//alert(deal_item_sele_page_id);
	dealItemGet=JSON.parse(window.localStorage.getItem('dealItemsId'));
	dealFullItem=0;	
	if(dealItemGet!=null) {	
		var dealExiIndexId=0;
		var dealExiId=0;
		var dealDets = dealItemGet.items;
		
		$.each(dealDets, function(index, dealDet) {			
			//alert(dealDet.item_id);
			if(dealDet.deal_id==dealId) {
				if(dealDet.item_id!=chkitemid) {
					dealExiIndexId=index;
					dealExiId=2;
					return false;
				} else {
					dealExiId=1;
					return false;
				}				
			}
		});		
		
		if(dealExiId==0){
			dealItemGet.items.push({"deal_id": dealId,"item_id": chkitemid,"deal_main_item_id":deal_item_sele_page_id});
			alert("Deal item added sucess!");			
		} else if(dealExiId==2){
			var dealRemoveDeal = dealItemGet.items;
			dealRemoveDeal.splice(dealExiIndexId, 1);
			dealItemGet.items.push({"deal_id": dealId,"item_id": chkitemid,"deal_main_item_id":deal_item_sele_page_id});
			alert("Deal item updates sucess!");			
		} else {
			if(confirm("Deal item already exist! do you want to go back to deal selection ? ")) {
				window.location.href='deal.html?delitemId='+deal_item_sele_page_id;
			}
		}		
		
		var dealCatIdArrsy = dealItemDet.deal_cat_id.split("#:#"); 	

		dealCatIdArrsyLenght=dealCatIdArrsy.length;		
		dealItemGetLenght=dealItemGet.items;
		dealItemCount=0;
		if(dealItemGetLenght!=null) {
			jQuery.map(dealItemGetLenght, function(obj) {
				if(obj.deal_main_item_id === deal_item_sele_page_id)
					++dealItemCount; // or return obj.name, whatever.
			});
		}
		//alert(dealCatIdArrsyLenght+":"+dealItemCount);
		//alert(JSON.stringify(dealItemGet));
		if(dealItemCount==dealCatIdArrsyLenght) {	
			dealFullItem=1;
		}else {
			dealFullItem=0;
			window.location.href='deal.html?delitemId='+deal_item_sele_page_id;
		}
	} else {
		var dealItemGet={"items":[{"deal_id": dealId,"item_id": chkitemid,"deal_main_item_id":deal_item_sele_page_id}]};
		dealFullItem=0;
		//deal_item_id=chkitemid;
		alert("Deal item added sucess!");
		window.location.href='deal.html?delitemId='+deal_item_sele_page_id;
	}
	
	window.localStorage.setItem('dealItemsId',JSON.stringify(dealItemGet)); // store local storage		
	//alert(dealFullItem);
	if(dealFullItem==1) {	
	
		dealItemGetStore=JSON.parse(window.localStorage.getItem('dealItemsId'));
		
		deal_item_id=null;
		var dealIdStore = dealItemGetStore.items;
		$.each(dealIdStore, function(index, dealIdSt) {	
			if(dealIdSt.deal_main_item_id==deal_item_sele_page_id) {
				if(deal_item_id!=null) {
					deal_item_id+=','+dealIdSt.item_id;
				} else {
					deal_item_id=dealIdSt.item_id;
				}
			}
		});
		//alert(deal_item_id);
		var carDataGet = JSON.parse(window.localStorage.getItem('carDatas'));
		//alert(JSON.stringify(carDataGet));
		if(carDataGet!=null) {
			
			var itemExiIndexId=0;
			var itemExiId=0;
			var itemDets = carDataGet.items;
			$.each(itemDets, function(index, itemDet) {			
				//alert(itemDet.item_id);
				if(itemDet.item_id==deal_item_sele_page_id) {
					itemExiIndexId=index;
					itemExiId=2;
					return false;								
				} 
			});
			if(itemExiId==0){
				carDataGet.items.push({
						"item_id": deal_item_sele_page_id,
						"deal_id": deal_item_id,
						"item_name":dealItemDet.item_name,
						"item_desc":dealItemDet.item_desc,
						"item_img":dealItemDet.item_img,
						"item_price":dealItemDet.item_selling_price	
						});
				
				alert("Item added sucess!");
				window.location.href='deal.html?delitemId='+deal_item_sele_page_id;
				
			} else if(itemExiId==2){
			
				var itemRemoveDeal = carDataGet.items;
				itemRemoveDeal.splice(itemExiIndexId, 1);
				
				carDataGet.items.push({
						"item_id": deal_item_sele_page_id,
						"deal_id": deal_item_id,
						"item_name":dealItemDet.item_name,
						"item_desc":dealItemDet.item_desc,
						"item_img":dealItemDet.item_img,
						"item_price":dealItemDet.item_selling_price	
						});
				
				alert("Item updates sucess!");
				window.location.href='deal.html?delitemId='+deal_item_sele_page_id;
				
			} 
		} else {
			var carDataGet={"items":[{
			"item_id": deal_item_sele_page_id,
			"deal_id": deal_item_id,
			"item_name":dealItemDet.item_name,
			"item_desc":dealItemDet.item_desc,
			"item_img":dealItemDet.item_img,
			"item_price":dealItemDet.item_selling_price			
			}]};
			
			alert("Item added sucess!");
			window.location.href='deal.html?delitemId='+deal_item_sele_page_id;
		
		}
		//alert(cartData.items);
		
		window.localStorage.setItem('carDatas',JSON.stringify(carDataGet)); // store local storage	
	}
});
