if(dataAppConfig==null || userData==null) {
	window.location.href='index.html';
}
if(orderId!=null) {
	$('#orderList').hide();
	showOrderinfo();
}else{
	$('#placOtheOrdId').hide();
	getOrderList();
}

function getOrderList() {	
	var store = 'Mw';
	var order_id = null;
	var user_id = userData.user_data.userid;
	//$('#orderList').remove();		
	//alert(serviceURL+'orderdet/'+order_id+'/'+store);
	$.getJSON(serviceURL+'orderdet/'+order_id+'/'+store+'/'+user_id, function(data) {
		
		var orderDets = data.order;
		//alert(orderDets);
		$.each(orderDets, function(index, item) {
			
			$('#orderList').append('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="order_info.html?orderId='+item.order_id+'" class="ui-link-inherit" rel="external">'+(index+1)+'. Order Id:'+item.order_id+' Amount:'+item.total_amount+' Delivery Time:'+item.delivery_time+'</a></div><span class="ui-icon ui-icon-arrow-r"></span></div></li>');
		}); 
		$('#orderList').listview('refresh');
	});
}


function showOrderinfo() {	
	var store = 'Mw';
	var order_id = orderId;
	var user_id = userData.user_data.userid;
	//alert(serviceURL+'orderdet/'+order_id+'/'+store);
	$.getJSON(serviceURL+'orderdet/'+order_id+'/'+store+'/'+user_id, function(data) {
		
		var orderDets = data.order;
		$.each(orderDets, function(index, item) {
			
			htmlData='<h2 style="text-align:left; color:#ffffff;font-sze:22px;">Your order has been confirmed, details are below:</h2>';
			 htmlData+='<div style="margin:20px 0 0 0;text-shadow:0;"><h4 style="color:#000; text-shadow:none;font-size:21px;">Order number: '+item.order_id+'</h4></div>';      
			
			htmlData+='<p class="itemp" style="text-shadow:none;">Meal Ready Time: '+item.delivery_time+'</p>';
			htmlData+='<div style="margin:20px 0;"><h4 class="itemp" style="text-shadow:none;"><strong>Cost:</strong> $ '+item.total_amount+'</h4><h4 class="itemp" style="text-shadow:none;"><strong>Payment Status:</strong>'+item.payment_status+'</h4></div>';
			htmlData+=' <div style="margin:20px 0;"><h4 class="itemp" style="text-shadow:none;">Store Name: '+dataAppConfig.AppConfig.store_name+'</h4><h4 class="itemp" style="text-shadow:none;">Store Address: '+userData.addr_data.address+' , '+userData.addr_data.street+' '+userData.addr_data.city+' '+userData.addr_data.post_code+'</h4><h4 class="itemp" style="text-shadow:none;">Directions to store: '+userData.addr_data.address+' , '+userData.addr_data.street+' '+userData.addr_data.city+' '+userData.addr_data.post_code+'</h4></div>';
			
			$('#orderDetList').html(htmlData);
		}); 
		
	});
}
