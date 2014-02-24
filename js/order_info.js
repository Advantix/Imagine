if(dataAppConfig==null || userData==null) {
	window.location.href='index.html';
}
if(orderId!=null) {
	if(bokord==null) {
		headerHtml('Confirmation');	
	} else {
		headerHtml('Order Details');	
	}
	$('#orderList').hide();
	showOrderinfo();
}else{
	headerHtml('Order History');	
	$('#placOtheOrdId').hide();
	$('#orderDetList').hide();
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
			
			$('#orderList').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="order_info.html?orderId='+item.order_id+'&bokord=view"  rel="external">'+(index+1)+'. Order Id:'+item.order_id+' Amount:'+item.total_amount+' Delivery Time:'+item.delivery_time+'</a></li>');
		}); 
		//$('#orderList').listview('refresh');
	});
}


function showOrderinfo() {	
	var store = 'Mw';
	var order_id = orderId;
	var user_id = userData.user_data.userid;
	//alert(serviceURL+'orderdet/'+order_id+'/'+store);
	$.getJSON(serviceURL+'orderdet/'+order_id+'/'+store+'/'+user_id, function(data) {
		//alert(resData.restaurant_name);
		var orderDets = data.order;
		$.each(orderDets, function(index, item) {
				if(bokord==null) {
					htmlData='<h4>Your order has been confirmed, details are below:</h4>';
				} else {
					htmlData='<h4>Your order details</h4>';
				}
				
				htmlData+='<div style="margin:20px 0 0 0;">';
				htmlData+='<h4>Order Number: '+item.order_id+'<h4></div>';    
				htmlData+='<p class="itemp">Meal Ready Time: '+item.delivery_time+'</p>';
				htmlData+='<div style="margin:20px 0;"><h4 class="itemp">Cost: $ '+item.gross_total+'</h4>';
				htmlData+='<h4 class="itemp">Payment Status: <span>'+item.payment_status+'</span></h4>';    
				htmlData+='</div>';
			
				htmlData+='<div style="margin:20px 0;">';
				htmlData+='<h4 class="itemp">Store Name: '+dataAppConfig.AppConfig.store_name+'</h4>';  
				htmlData+='<h4 class="itemp">Store Address: '+resData.restaurant_name+'('+resData.restaurant_location+'), '+resData.address_line1+', '+resData.address_line2+', '+resData.phone+', '+resData.suburb+', '+resData.state+' - '+resData.postcode+'</h4>';  
				htmlData+='</div>';
				//htmlData+='<div class="clearfix"><a class="ui-lfloat ui-btn ui-btn-corner-all ui-shadow ui-btn-up-a" data-theme="a" rel="external" data-role="button" id="storeDirection" href=""><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Directions to store</span></span></a>        	</div>';
			
			/*htmlData='<h2 style="text-align:left; color:#ffffff;font-sze:22px;">Your order has been confirmed, details are below:</h2>';
			htmlData+='<div style="margin:20px 0 0 0;text-shadow:0;"><h4 style="color:#000; text-shadow:none;font-size:21px;">Order number: '+item.order_id+'</h4></div>';      
			
			htmlData+='<p class="itemp" style="text-shadow:none;">Meal Ready Time: '+item.delivery_time+'</p>';
			htmlData+='<div style="margin:20px 0;"><h4 class="itemp" style="text-shadow:none;"><strong>Cost:</strong> $ '+item.total_amount+'</h4><h4 class="itemp" style="text-shadow:none;"><strong>Payment Status:</strong>'+item.payment_status+'</h4></div>';
			htmlData+=' <div style="margin:20px 0;">
			
			<h4 class="itemp" style="text-shadow:none;">Store Name: '+dataAppConfig.AppConfig.store_name+'</h4>
			<h4 class="itemp" style="text-shadow:none;">Store Address: '+userData.addr_data.address+' , '+userData.addr_data.street+' '+userData.addr_data.city+' '+userData.addr_data.post_code+'</h4></div>';*/
			
			$('#orderDetList').html(htmlData);
		}); 
		
	window.localStorage.removeItem('hoursinfo');	
	window.localStorage.removeItem('holidaypercnt');
	window.localStorage.removeItem('minorderamt');
	});
}