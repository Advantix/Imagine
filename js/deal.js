if(dataAppConfig==null) {
	window.location.href='index.html';
}
$("#pageLoader").show();

if(delitemId!=null){
	// show when order enabled	
	$('#checkOutButtonId').hide();
	$('#addCartButtonId').hide();	
	getDealItemDet();
	
}else if(dealId!=null && chkitemid==null){
	getSingleDealItem();
	$('#checkOutButtonId').hide();
	$('#addCartButtonId').hide();	
}else if(chkitemid!=null && dealId!=null){
	addCartItemdet();
	$('#checkOutButtonId').hide();
	$('#addCartButtonId').hide();// show when order enabled	
}else{
	getDealItemList();
	$('#checkOutButtonId').hide();
	$('#addCartButtonId').hide();	
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
	$.getJSON(serviceURL+'dealitemlist/'+restId+'/'+tabId, function(data) {		
		$('#menuList li').remove();		
		//alert(data.DealList);
		var items = data.DealList;
		if(items.length>0) {
			$.each(items, function(index, item) {
				dealItemsId=item.deal_items_id=="" ? null :1;
				strDesc=item.item_desc;
				strItemName=item.item_name;
				$('#menuList').append('<li class="ui-li-has-thumb"><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="deal.html?delitemId='+item.item_id+'" rel="external" ><img src="'+itemImgURL+(item.item_img!=""? item.item_img:defaultImgURL)+'"><h2>' + strItemName+'&nbsp;</h2><p>'+ strDesc + '</p></a></li>');
			});
		} else {
			$('#menuList').append('<li class="ui-li-has-thumb"><span style="color:#ff0000">No Deals Found</span></li>');
		}
		//onclick="showDealCartAlert('+item.item_id+','+dealFlag+','+dealItemsId+')"
		$('#menuList').listview('refresh');
		headerHtml('Deal Item List');
		$("#pageLoader").hide();
		//$('#deallist').html('Deal Item List');
	});
}

function getDealItemDet() {
	htmlVal="";
	//alert(serviceURL+'itemdet/'+itemId);
	$.getJSON(serviceURL+'dealitemdet/'+delitemId, function(data) {
		$('#menuList').hide();		
		//alert(data);
		var itemDets = data.ItemDet;
		window.localStorage.setItem('deal_item_det',JSON.stringify(itemDets[0])); // store local storage
		$.each(itemDets, function(index, itemDet) {
			//alert('item page');
			//htmlVal+='<h2>'+itemDet.item_name+'</h2>';
		htmlVal+='<div class="confirmation">';
		htmlVal+='<h2>'+itemDets[0].item_name+'</h2>';
			htmlVal+=' <div class="row_div">';
					htmlVal+='<img src="'+itemImgURL+(itemDet.item_img!=""? itemDet.item_img:defaultImgURL)+'" alt="">';
				htmlVal+='</div>';   
			
				htmlVal+='<p>'+itemDet.item_desc+'</p>';   
				// hidden fields
				htmlVal+='<input type="hidden" value="'+itemDet.item_name+'" name="item_name"  id="item_name"><input type="hidden" value="'+itemDet.item_id+'" name="item_id"  id="item_id"><input type="hidden" value="'+itemDet.item_desc+'" name="item_desc" id="item_desc"><input type="hidden" value="'+itemDet.item_img+'" name="item_img"  id="item_img">';
			
			
                   
			htmlVal+='<p><h3>Price <span>$'+ itemDet.item_selling_price + '/-</span><h3>';
				

				/* htmlVal+='<div class="item-wrap clearfix">';				 
				htmlVal+='<div class="item-left price-txt"><h2>Selling Price</h2></div>';		
				htmlVal+='<div class="item-right"><h2 class="red-txt">$ '+ itemDet.item_selling_price + '/-</h2></div>'; */				
				// hidden fields
				htmlVal+='<input type="hidden" value="'+itemDet.item_selling_price+'" name="price" id="price">';
			
			htmlVal+='</p>';
			
			htmlVal+='</div>';
			$('#itemDetList').html(htmlVal);
		});	
			
		var carDataGetDealval = window.localStorage.getItem('dealItemsId');					
		//alert(JSON.stringify(data.DealItemDet));
		var dealNam = data.DealItemDet;		
		$.each(dealNam, function(index, dealItem) {
			if(carDataGetDealval!=null) {
				var carDataGetDeal = JSON.parse(carDataGetDealval);
				var dealSel=jQuery.map(carDataGetDeal.items, function(obj) {
					if(obj.deal_id === dealItem.id)
						 return obj.deal_id; // or return obj.name, whatever.
				});
			} else {
				dealSel="";
			}
			//alert(dealSel);
			if(dealSel!="") {
				dealSelSpan='ui-icon-check';
				tick='id="tick"';
			} else {
				dealSelSpan='ui-icon-check';
				tick='';
			}
			
			strDealItemName=dealItem.deal_item_name;
			//$('#dealItemList').append('<li '+tick+'><a class="ui-link-inherit '+dealSelSpan+'" href="deal.html?dealId='+dealItem.id+'" rel="external">' + strDealItemName + '&nbsp;</a></li>'); for tick button change
			$('#dealItemList').append('<li '+tick+'><a class="ui-link-inherit" href="deal.html?dealId='+dealItem.id+'" rel="external">' + strDealItemName + '&nbsp;</a></li>');
		});	
			
		$('#dealItemList').listview('refresh');
		headerHtml(itemDets[0].item_name);
		//$('#deallist').html(itemDets[0].item_name);
		$("#addCartButtonId").hide();
		$("#pageLoader").hide();
		
	});
}
function getSingleDealItem() {
	htmlVal="";
	//alert(serviceURL+'singledealitem/'+dealId);
	$.getJSON(serviceURL+'singledealitem/'+dealId, function(data) {	
		//alert(data);
		$('#menuList li').remove();	
		var itemDets1 = data.ItemDet;
		//alert(data.DealTitle);
		$.each(itemDets1, function(index, itemDet) {
				strDealDesc=itemDet.item_desc;
				strDealItemName=itemDet.item_name;
				$('#menuList').append('<li class="ui-li-has-thumb"><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="deal.html?chkitemid='+itemDet.item_id+'&dealId='+dealId+'" rel="external" ><img src="'+itemImgURL+(itemDet.item_img!=""? itemDet.item_img:defaultImgURL)+'"><h2>' + strDealItemName + '</h2><p >'+ strDealDesc + '</p></a></li>');
			});
			//$('#menuList').listview('refresh');
			//$('#deallist').html(data.DealTitle);
			headerHtml(data.DealTitle);
			$("#pageLoader").hide();
	});
}

function addCartItemdet() {
	htmlVal="";
	//alert(serviceURL+'itemdet/'+itemId);
	$.getJSON(serviceURL+'dealitemdet/'+chkitemid+'/'+dealId, function(data) {
		$('#menuList').hide();		
		//alert(data.DealTitle);
		var itemDets = data.ItemDet;
		$.each(itemDets, function(index, itemDet) {
			//alert('item page');
				htmlVal+='<div class="confirmation">';
				htmlVal+='<h2>'+itemDet.item_name+'</h2>';
			
				htmlVal+=' <div class="row_div">';
					htmlVal+='<img src="'+itemImgURL+(itemDet.item_img!=""? itemDet.item_img:defaultImgURL)+'" alt="">';
				htmlVal+='</div>';  				
				htmlVal+='<p>'+itemDet.item_desc+'</p>';   
				// hidden fields
				htmlVal+='<input type="hidden" value="'+itemDet.item_name+'" name="item_name"  id="item_name"><input type="hidden" value="'+itemDet.item_id+'" name="item_id"  id="item_id"><input type="hidden" value="'+itemDet.item_desc+'" name="item_desc" id="item_desc"><input type="hidden" value="'+itemDet.item_img+'" name="item_img"  id="item_img">';
				
			htmlVal+='</div>';
			$('#itemDetList').html(htmlVal);
			//$('#deallist').html(data.DealTitle+' [Deal]');
			headerHtml(data.DealTitle+' [Deal]');
			$("#pageLoader").hide();
		});
	});
}


// Add to cart Post	
$("#addCartButtonId").click(function() {
		
	var dealItemDet = JSON.parse(window.localStorage.getItem('deal_item_det'));
	//alert(JSON.stringify(dealItemDet));
	deal_item_sele_page_id = dealItemDet.item_id;
	//alert(deal_item_sele_page_id);
	dealItemGetval=window.localStorage.getItem('dealItemsId');
	dealFullItem=0;	
	if(dealItemGetval!=null) {	
		dealItemGet=JSON.parse(dealItemGetval);
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
		var carDataGetval = window.localStorage.getItem('carDatas');
		//alert(JSON.stringify(carDataGet));
		if(carDataGetval!=null) {
			var carDataGet = JSON.parse(carDataGetval);
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
				var carDataGet = JSON.parse(carDataGetval);
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
