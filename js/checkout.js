if(dataAppConfig==null) {
	window.location.href='index.html';
}
$('#services').bind('pageinit', function(event) {
	//if(checkConnection()) {
		getCartList();
	//}
});

var dealId = window.localStorage.getItem('deal_id');

if(dealId==null) {
	$('#changeOrdDiveId').html('<img src="img/remove.png" alt="" id="changeOrdImgId">&nbsp;Clear Cart');
	//$('#changeOrdImgId').attr('src','img/remove.png');
} else {
	$('#changeOrdDiveId').html('<img src="img/change_order.png" alt="" id="changeOrdImgId">&nbsp;Change Order');
}

$.ajaxSetup({ cache: false });
// Add to cart Post	
function getCartList() {	
	var carDataGetAfter = JSON.parse(window.localStorage.getItem('carDatas'));
	
	if(carDataGetAfter!=null) {
		//alert(carDataGetAfter.items);
		var itemDetsAf = carDataGetAfter.items;
		htmlData="";
		priceTotal=0;
		dealName=window.localStorage.getItem('deal_name');
		//alert(dealName);
		if(dealName!=null) {
			htmlData+='<h4>Deal :'+dealName+'</h4>';
		}
		
		$.each(itemDetsAf, function(index, itemDetaf) {
			//alert(index);
			//alert(itemDetaf.deal_id);
			htmlData+='<div class=" checkout-grid clearfix">';
                htmlData+='<ul>';
                    htmlData+='<li class="sno">'+(index+1)+'.</li> <li class="title"><h4 >' + itemDetaf.item_name + '&nbsp;'+(itemDetaf.deal_id!=0 ? '[ deal ]' : (itemDetaf.price_type!=null ? '['+itemDetaf.price_type+']' : ''))+'</h4>';
                    htmlData+='<span>'+ itemDetaf.item_desc + '</span>';
                    htmlData+='</li> <li class="sprice"><h4 >$ '+itemDetaf.item_price+'</h4></li><li class="sremove"><img src="img/remove.png" alt="" onclick="removeItem('+index+');"></li>';       
                htmlData+='</ul>';
            htmlData+='</div>';
			//alert(itemDetaf.item_price);
			priceTotal=parseFloat(priceTotal)+parseFloat(itemDetaf.item_price);
			
			
		});	
		priceSubTotal = +(Math.round(priceTotal + "e+2")  + "e-2"); 
		// subtotal
		htmlData+='<hr></hr><div  class="checkout-grid clearfix"  >';
			htmlData+='<ul>';
				htmlData+='<li class="sno">&nbsp;</li><li class="title"><h4 style=" text-align:right" >Subtotal</h4>';				
				htmlData+='</li> <li class="sprice"><h4 >$ '+priceSubTotal+'<input type="hidden" name="total_amount" id="total_amount" value="'+priceSubTotal+'"></h4></li>  ';       
			htmlData+='</ul>';
		htmlData+='</div><hr></hr>';
		
		var holidaypercnt = JSON.parse(window.localStorage.getItem('holidaypercnt'));
		if(holidaypercnt!=null && holidaypercnt!=""){
			percentageval = ((priceSubTotal/100)*holidaypercnt).toFixed(1);
			htmlData+='<div  class="checkout-grid clearfix"  >';
			htmlData+='<ul>';
			htmlData+='<li class="sno">&nbsp;</li><li class="title"><h4 style=" text-align:right" >Holiday Cost</h4>';				
			htmlData+='</li> <li class="sprice"><h4 >$ '+percentageval+'</h4></li>  ';       
			htmlData+='</ul>';
			htmlData+='</div><hr></hr>';	
		}else{
			percentageval=0;
		}		
		
		// total
		overalltotal = (+priceSubTotal + +percentageval).toFixed(1);
		htmlData+='<div  class="checkout-grid clearfix"  >';
			htmlData+='<ul>';
				htmlData+='<li class="sno">&nbsp;</li><li class="title"><h4 style=" text-align:right" >Total</h4>';				
				htmlData+='</li> <li class="sprice"><h4 >$ '+overalltotal+'<input type="hidden" name="gross_total" id="gross_total" value="'+overalltotal+'"></h4></li>';       
			htmlData+='</ul>';
		htmlData+='</div>';	
		
		$('#itemDetList').html(htmlData);
	} else {
		
		$('#buttGroup').hide();
		$('#placeOrdButtonId').hide();
		$('#pickupnow').hide();
		$('#pickupTimeSelector').hide();
			htmlData='<div class=" checkout-grid clearfix">';
                htmlData+='<ul>';
				if(dealId!=null) {
					htmlData+='<li class="title" style="width:55%;text-shadow:none;">Cart is empty!<a href="showMenu.html?itemId='+dealId+'"  class="ui-link-inherit" rel="external" style="color:#000000 ;text-decoration:underline !important;text-shadow:none;">&nbsp;Add items</a></li>';
				} else {
					htmlData+='<li class="title" style="width:55%;text-shadow:none;">Cart is empty!<a href="showMenu.html"  class="ui-link-inherit" rel="external" style="color:#000000;text-decoration:underline !important;text-shadow:none;">&nbsp;Add items</a></li>';
				}
		
		$('#itemDetList').html(htmlData);
	}
	
}
function removeItem(indexId) {
	
	removeDealItems(indexId);
	//alert(indexId);
	var carDataGetRemove = JSON.parse(window.localStorage.getItem('carDatas'));
	//alert(carDataGetAfter.items);
	var cartItemCnt=carDataGetRemove.items.length;
	//alert(cartItemCnt);	
	var itemRemove = carDataGetRemove.items;
	$.each(itemRemove, function(index, itemRem) {
		//alert(index);
		if(index==indexId) {
			//alert(indexId);
			 itemRemove.splice(indexId, 1);
			//delete itemRemove[indexId];
			cartItemCnt=cartItemCnt-1;			
		}
	});
	
	//alert(itemRemove);
	//alert(cartItemCnt);
	if(cartItemCnt>0) {
		window.localStorage.setItem('carDatas',JSON.stringify(carDataGetRemove)); // store local storage
		alert('Item removed success!');
		refresh();
	} else if(cartItemCnt==0) {
		window.localStorage.removeItem('dealItemsId');	
		window.localStorage.removeItem('carDatas');		
		window.localStorage.removeItem('deal_id');
		window.localStorage.removeItem('deal_name');
		window.localStorage.removeItem('dealSelAll');	
		window.localStorage.removeItem('hoursinfo');
		alert('Item removed success!');
		refresh();
	}
	
}

function removeDealItems(indexItemId) {
	//alert(indexItemId);
	var carDataGetRemoveDeal = JSON.parse(window.localStorage.getItem('dealItemsId'));
	if(carDataGetRemoveDeal!=null) {
		//alert(carDataGetAfter.items);
		var cartItemCntDeal=carDataGetRemoveDeal.items.length;
		//alert(cartItemCntDeal);	
		var itemRemoveDeal = carDataGetRemoveDeal.items;
		$.each(itemRemoveDeal, function(index, itemRem) {
			//alert(index);
			if(index==indexItemId) {
				//alert(indexItemId);
				 itemRemoveDeal.splice(indexItemId, 1);
				//delete itemRemoveDeal[indexItemId];
				cartItemCntDeal=cartItemCntDeal-1;			
			}
		});
		
		//alert(itemRemoveDeal);
		//alert(cartItemCntDeal);
		if(cartItemCntDeal>0) {
			window.localStorage.setItem('dealItemsId',JSON.stringify(carDataGetRemoveDeal)); // store local storage		
			refresh();
		} else if(cartItemCntDeal==0) {
			window.localStorage.removeItem('dealItemsId');		
			refresh();
		}
	}
}

var hoursinfo = JSON.parse(window.localStorage.getItem('hoursinfo'));		
// delevery time
if(hoursinfo!=null) {
	$('#deliveryDivId').html('<h4 class="title">Delivery Time: '+hoursinfo+'</h4>');
} else {
	$('#deliveryDivId').hide();
}

$("#pickupnow").click(function() {	
	var gettime = new Date(); 
	var currdate = gettime.getFullYear()+'-'+(gettime.getMonth()+1)+'-'+gettime.getDate(); 
	var currtime = gettime.getHours()+':'+gettime.getMinutes(); 
	var postData = 'rest_id='+restId+'&date='+currdate+'&time='+currtime;	
	//alert(serviceURL+'workinghours/'+postData);
	$.ajax({
		type: 'POST',
		data: postData,
		url: serviceURL+'workinghours',
		success: function(data){	
			//alert(data);
			if(data.response==1) {
				window.localStorage.setItem('hoursinfo',JSON.stringify(data.hoursinfo)); // store local storage
				window.localStorage.setItem('holidaypercnt',JSON.stringify(data.percnt));
				console.log(data);
				//alert(data.hoursinfo);
				//alert(data.percnt);
				alert('Pick up time selected successfully');
				refresh();
				//window.localStorage.setItem('form_active','#addrFrmId'); // store local storage
				//window.location.href='myaccount.html';
			}else{
				console.log(data);				
				alert(data.response);
			}
		},
		error: function(data){
			console.log(data);
			alert('There was an error adding your comment');
		}
	});
	
	return false;
});

$("#pickupTimeSelector").click(function() {
	window.location.href='working_hours.html';
});

$("#placeOrdButtonId").click(function() {	
	if(userData!=null) {
		postData = 'rest_id='+restId+'&postcode='+userData.addr_data.post_code;
		$.ajax({
			type: 'POST',
			data: postData,
			url: serviceURL+'postcodecheck',
			success: function(data){
				if(data.response==1){
					$("#pageLoader").show();
					$('#itemCheckOutFrm').submit();
				}else{
					console.log(data);				
					alert(data.response);
				}				
			},
			error: function(data){
				console.log(data);
				alert('There was an error in your biling details');
			}
		});	
	} else {
		if(confirm("Please login to procced next step")) {
			window.location.href='register.html';
		}
	}
	
});

function checkAllDealItemInCart() {
	var dealItemGet=JSON.parse(window.localStorage.getItem('dealItemsId'));
	
	if(dealItemGet!=null) {
		var dealItemGetCnt=dealItemGet.items.length;
		var getDealItemDetsFrmDB = JSON.parse(window.localStorage.getItem('deal_item_det'));
		var dealCatIdArrsy = getDealItemDetsFrmDB.deal_cat_id.split("#:#"); 	
		var getDealItemDetsFrmDBCnt=dealCatIdArrsy.length;
		if(dealItemGetCnt==getDealItemDetsFrmDBCnt) {
			return true;
		} else {
			return false;
		}

	} else {
		return true;
	}
	
}

$("#changOrdButtonId").click(function() {
	$("#pageLoader").show();
	window.localStorage.removeItem('dealItemsId');	
	window.localStorage.removeItem('carDatas');		
	window.localStorage.removeItem('deal_id');
	window.localStorage.removeItem('deal_name');
	window.localStorage.removeItem('dealSelAll');
	window.localStorage.removeItem('hoursinfo');
	if(dealId!=null) {
		window.location.href='showMenu.html?itemId='+dealId;
	} else {
		window.location.href='checkout.html';
	}
});

$('#itemCheckOutFrm').submit(function(){		
	//var postData = $(this).serialize();
	var hoursinfoCheck = JSON.parse(window.localStorage.getItem('hoursinfo'));	
	//alert(hoursinfoCheck);
	if(hoursinfoCheck!=null) {			
		var carDataGetSubmit = JSON.parse(window.localStorage.getItem('carDatas'));
		var hoursinfo = JSON.parse(window.localStorage.getItem('hoursinfo'));
		var postData=JSON.stringify(carDataGetSubmit.items);
		grossTotal =$('#gross_total').val();
		totalAmount =$('#total_amount').val();
		//alert(postData);	
		$.ajax({
			type: 'POST',		
			url: serviceURL+'order',
			dataType : 'json',
			data:{data:postData,store_id:'Mw',user_id:userData.user_data.userid,delivery_time:hoursinfo,gross_total:grossTotal,total_amount:totalAmount,'restaurant_id':restId},
			success: function(data){
				//alert(data);
				console.log(data);
				window.localStorage.removeItem('dealItemsId');	
				window.localStorage.removeItem('carDatas');		
				window.localStorage.removeItem('deal_id');
				window.localStorage.removeItem('deal_name');
				window.localStorage.removeItem('dealSelAll');
				window.localStorage.removeItem('hoursinfo');
				alert('Your order successfully placed');
				$("#pageLoader").hide();
				window.location.href='order_info.html?orderId='+data;
			},
			error: function(){
				//console.log(data);
				alert('There was an error process your order');
				$("#pageLoader").hide();
			}
		});
	}else{
		alert('Set delivery time before placing an order');
	}
	
	return false;
});