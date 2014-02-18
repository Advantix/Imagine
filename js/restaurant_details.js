if(dataAppConfig==null || resData==null) {
	window.location.href='index.html';
}

// Address box
htmlData='<h2 class="itemp">'+resData.restaurant_name+'</h2>';  
htmlData+='<h4 class="itemp">'+resData.address_line1+', '+resData.address_line2+', <br> '+resData.suburb+',<br> '+resData.state+' <br> '+resData.postcode+', <br> PH: '+resData.phone+', </h4>'; 

$('#addressDiv').html(htmlData);
	

// Map box

	// JSON
	var data = JSON.parse('[{"address":"'+resData.address_line1+', '+resData.address_line2+', '+resData.suburb+', '+resData.state+' , '+resData.postcode+'","content":"'+resData.restaurant_name+' ('+resData.restaurant_location+'), '+resData.address_line1+', '+resData.address_line2+', '+resData.suburb+', '+resData.state+' , '+resData.postcode+'","status":"live"}]');

	var $map = $('.gmap');
	

	// Json Loop
	$.each(data, function(key, val) {
		$map.gmap3({
			marker:{
				values:[{
					address:val.address,
					events: {
						click: function(marker, event, context) {

							gmap_clear_markers();
							
							 $map.gmap3({
								map:{
								  options:{
									center:event.latLng,
									zoom: 10
								  }
								}
							 });                        

							$(this).gmap3({
								overlay:{
									address:val.address,
									options:{
										content:  '<div class="infobox">'+val.content+'</div>',
										offset:{
											y:-10,
											x:-(val.content.length*3)
										}
									}
								}
							});
						}
					}
				}]
			}
		});
	});

	// Function Clear Markers
	function gmap_clear_markers() {
		$('.infobox').each(function() {
			$(this).remove();
		});
	}


// Takeaway box

htmlDataTakeAway='<p style="margin:0; padding:0;" ><strong>M</strong> - '+checkCloseDate(resData.takeaway_monday_start, resData.takeaway_monday_close,resData.takeaway_monday_na)+' </p><br>';
htmlDataTakeAway+='<p style="margin:0; padding:0;"><strong>T </strong>- '+checkCloseDate(resData.takeaway_tuesday_start, resData.takeaway_tuesday_close,resData.takeaway_tuesday_na)+'</p><br>';
htmlDataTakeAway+='<p style="margin:0; padding:0;"><strong>W</strong> - '+checkCloseDate(resData.takeaway_wednesday_start, resData.takeaway_wednesday_close,resData.takeaway_wednesday_na)+'</p><br>';
htmlDataTakeAway+='<p style="margin:0; padding:0;"><strong>T</strong> - '+checkCloseDate(resData.takeaway_thursday_start, resData.takeaway_thursday_close,resData.takeaway_thursday_na)+'</p><br>';
htmlDataTakeAway+='<p style="margin:0; padding:0;"><strong>F</strong> - '+checkCloseDate(resData.takeaway_friday_start, resData.takeaway_friday_close,resData.takeaway_friday_na)+'</p><br>';
htmlDataTakeAway+='<p style="margin:0; padding:0;"><strong>S</strong> - '+checkCloseDate(resData.takeaway_saturday_start, resData.takeaway_saturday_close,resData.takeaway_saturday_na)+'</p><br>';
htmlDataTakeAway+='<p style="margin:0; padding:0;"><strong>S</strong> - '+checkCloseDate(resData.takeaway_sunday_start, resData.takeaway_sunday_close,resData.takeaway_sunday_na)+'</p><br>';
				
$('#TakeAwayOpeningHoursDiv').html(htmlDataTakeAway);		


// Delivery box
htmlDatadelivery='<p style="margin:0; padding:0;" ><strong>M</strong> - '+checkCloseDate(resData.delivery_monday_start, resData.delivery_monday_close,resData.delivery_monday_na)+' </p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>T </strong>- '+checkCloseDate(resData.delivery_tuesday_start, resData.delivery_tuesday_close,resData.delivery_tuesday_na)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>W</strong> - '+checkCloseDate(resData.delivery_wednesday_start, resData.delivery_wednesday_close,resData.delivery_wednesday_na)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>T</strong> - '+checkCloseDate(resData.delivery_thursday_start, resData.delivery_thursday_close,resData.delivery_thursday_na)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>F</strong> - '+checkCloseDate(resData.delivery_friday_start, resData.delivery_friday_close,resData.delivery_friday_na)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>S</strong> - '+checkCloseDate(resData.delivery_saturday_start, resData.delivery_saturday_close,resData.delivery_saturday_na)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>S</strong> - '+checkCloseDate(resData.delivery_sunday_start, resData.delivery_sunday_close,resData.delivery_sunday_na)+'</p><br>';
				
$('#DeliveryOpeningHoursDiv').html(htmlDatadelivery);	

headerHtml('Restaurant Details');

function checkCloseDate(str,end,na) {
	if(na==0) {
		return str+' - '+ end;
	} else {
		return 'Closed';
	}
}
