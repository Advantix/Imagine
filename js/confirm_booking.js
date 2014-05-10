if(dataAppConfig==null || userData==null) {
	window.location.href='index.html';
}

if(bokId!=null) {
	if(bokord==null) {
		headerHtml('Confirmation');	
	} else {
		headerHtml('Reservation Details');	
	}
	$('#orderList').hide();
	showOrderinfo();
}else{	
	headerHtml('History');	
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
			
			$('#orderList').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="confirm_booking.html?bokId='+item.booking_id+'&bokord=view"  rel="external"> Reservation Date: '+item.booking_date+'</a></li>');
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
				if(bokord==null) {
					htmlData=' <h2>Reservation Confirmation</h2>';
					htmlData+='<p>Thank you, your request has been confirmed.<br> Please see reservation details below:</p>';
				} else {
					htmlData='<h2>Your booking details</h2>';
				}
				
				htmlData+=' <div class="clearfix infowarps">';
				
				//htmlData+=' <div class="row_div"><label>Confirm No </label>';
				//htmlData+='  <p class="info_right">'+item.booking_id+'</p></div>';
				
				htmlData+=' <div class="row_div"><label>Name </label>';
				htmlData+='  <p class="info_right">'+item.fname+'</p></div>';
				
				htmlData+=' <div class="row_div"><label>Phone </label>';
				htmlData+='  <p class="info_right">'+item.mobile+'</p></div>';
				
				htmlData+=' <div class="row_div"><label>Guests </label>';
				htmlData+='  <p class="info_right">'+item.num_guest+' Guests</p></div>';
				
				htmlData+=' <div class="row_div"><label>Time </label>';
				htmlData+='  <p class="info_right">'+(item.breakfast!="" ? tConvert(item.breakfast) : (item.lunch!="" ? tConvert(item.lunch) : (item.dinner!="" ? tConvert(item.dinner): "")))+'</p></div>';
				
				htmlData+=' <div class="row_div"><label>Date </label>';
				htmlData+='  <p class="info_right">'+getDateFormat(item.booking_date,'confirm')+'</p></div>';
				
				htmlData+=' <div class="row_div"><label>Request </label>';
				htmlData+='  <p class="info_right">'+item.comments+'</p></div>';
				
				htmlData+='</div>';
				
				htmlData+=' <div class="clearfix infowarps">';
				
				//htmlData+='<h2>'+resData.restaurant_name+'</h2>';  
				
				htmlData+='<div class="row_div"><h2>Location</h2></div>';
				htmlData+='<div class="row_div"><label>Address </label>';
				htmlData+='<p class="info_right">';
				htmlData+=resData.address_line1+'<br>  '+(resData.address_line2!="" ? resData.address_line2+'<br>' :"")+resData.suburb+'<br> '+resData.state+'  '+resData.postcode; 
				htmlData+='</p></div>';
				
				htmlData+='<div class="row_div"><label>Phone </label>  ';           
						   htmlData+='<p class="info_right"> '+resData.phone+'</p></div> ';
				
				
				htmlData+='<div class="row_div getdirect" >';
					htmlData+='<a href="restaurant_details.html" id="restMap" class="ui-btn" style="background: none repeat scroll 0 0 #00AB21;color:#fff" rel="external">Get Directions</a>';
				htmlData+='</div>';
				
				htmlData+='</div>';
			
			$('#orderDetList').html(htmlData);
		}); 
		
	window.localStorage.removeItem('hoursinfo');	
	window.localStorage.removeItem('holidaypercnt');
	window.localStorage.removeItem('minorderamt');
	});
}

  function tConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}