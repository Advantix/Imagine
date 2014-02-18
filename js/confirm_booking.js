if(dataAppConfig==null || userData==null) {
	window.location.href='index.html';
}
if(bokId!=null) {
	$('#orderList').hide();
	showOrderinfo();
}else{	
	$('#orderDetList').hide();
	getOrderList();
}

function getOrderList() {		
	var order_id = null;
	var user_id = userData.user_data.userid;
	//$('#orderList').remove();		
	//alert(serviceURL+'bookorder/'+order_id+'/'+restId+'/'+user_id);
	$.getJSON(serviceURL+'bookorder/'+order_id+'/'+restId+'/'+user_id, function(data) {
		
		var orderDets = data.order;
		//alert(orderDets);
		$.each(orderDets, function(index, item) {
			
			$('#orderList').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="confirm_booking.html?bokId='+item.booking_id+'"  rel="external">'+(index+1)+'. Booking Id:'+item.booking_id+' Booking Date: '+item.booking_date+' Guests: '+item.num_guest+' for '+(item.breakfast!="" ? item.breakfast+'am' : (item.lunch!="" ? item.lunch+'pm' : (item.dinner!="" ? item.dinner+'pm': "")))+' </a></li>');
		}); 
		//$('#orderList').listview('refresh');
	});
}


function showOrderinfo() {		
	var order_id = bokId;
	var user_id = userData.user_data.userid;
	//alert(serviceURL+'bookorder/'+order_id+'/'+restId+'/'+user_id);
	$.getJSON(serviceURL+'bookorder/'+order_id+'/'+restId+'/'+user_id, function(data) {
		//alert(data);
		var orderDets = data.order;
		$.each(orderDets, function(index, item) {					
				htmlData='<h4>Your booking has been confirmed</h4>';
				htmlData+='<div style="margin:20px 0 0 0;">';
				htmlData+='<h4>Confirmation Number: '+item.booking_id+'<h4></div>';    
				htmlData+='<p class="itemp">'+getDateFormat(item.booking_date)+'</p>';				
				htmlData+='<div style="margin:20px 0;"><h4 class="itemp">'+item.num_guest+' Guests for '+(item.breakfast!="" ? item.breakfast+'am' : (item.lunch!="" ? item.lunch+'pm' : (item.dinner!="" ? item.dinner+'pm': "")))+'</h4>';
				htmlData+='<h4 class="itemp">Name: <span>'+item.fname+'</span></h4>';    
				htmlData+='<h4 class="itemp">Mobile: <span>'+item.phone+'</span></h4>';    
				htmlData+='<h4 class="itemp">Notes: <span>'+item.comments+'</span></h4>';    
				htmlData+='</div>';
			
			$('#orderDetList').html(htmlData);
		}); 
		
	window.localStorage.removeItem('hoursinfo');	
	window.localStorage.removeItem('holidaypercnt');
	window.localStorage.removeItem('minorderamt');
	});
}