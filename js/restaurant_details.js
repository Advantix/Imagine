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
//alert(resData.sitting_status);
sitStaVa = resData.sitting_status;
sittingStaArr = sitStaVa.split('-');
sitVa = resData.sitting;
sittingArr = sitVa.split('||');
// Takeaway box

if(sittingStaArr[0]==0) {

$('#bkfstId').html('Dinein Hours ('+sittingArr[0]+')');

htmlDataTakeAway='<p style="margin:0; padding:0;" ><strong>M</strong> - '+checkCloseDate(resData.bk_monday_start, resData.bk_monday_end,resData.bk_monday_notallow)+' </p><br>';
htmlDataTakeAway+='<p style="margin:0; padding:0;"><strong>T </strong>- '+checkCloseDate(resData.bk_tuesday_start, resData.bk_tuesday_end,resData.bk_tuesday_notallow)+'</p><br>';
htmlDataTakeAway+='<p style="margin:0; padding:0;"><strong>W</strong> - '+checkCloseDate(resData.bk_wednesday_start, resData.bk_wednesday_end,resData.bk_wednesday_notallow)+'</p><br>';
htmlDataTakeAway+='<p style="margin:0; padding:0;"><strong>T</strong> - '+checkCloseDate(resData.bk_thursday_start, resData.bk_thursday_end,resData.bk_thursday_notallow)+'</p><br>';
htmlDataTakeAway+='<p style="margin:0; padding:0;"><strong>F</strong> - '+checkCloseDate(resData.bk_friday_start, resData.bk_friday_end,resData.bk_friday_notallow)+'</p><br>';
htmlDataTakeAway+='<p style="margin:0; padding:0;"><strong>S</strong> - '+checkCloseDate(resData.bk_saturday_start, resData.bk_saturday_end,resData.bk_saturday_notallow)+'</p><br>';
htmlDataTakeAway+='<p style="margin:0; padding:0;"><strong>S</strong> - '+checkCloseDate(resData.bk_sunday_start, resData.bk_sunday_end,resData.bk_sunday_notallow)+'</p><br>';
				
$('#BreakOpeningHoursDiv').html(htmlDataTakeAway);		
} else {
	$('#bkfstId').hide();
	$('#BreakOpeningHoursDiv').hide();
}

if(sittingStaArr[1]==0) {
// Delivery box
$('#lunchId').html('Dinein Hours ('+sittingArr[1]+')');
htmlDatadelivery='<p style="margin:0; padding:0;" ><strong>M</strong> - '+checkCloseDate(resData.lun_monday_start, resData.lun_monday_end,resData.lun_monday_notallow)+' </p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>T </strong>- '+checkCloseDate(resData.lun_tuesday_start, resData.lun_tuesday_end,resData.lun_tuesday_notallow)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>W</strong> - '+checkCloseDate(resData.lun_wednesday_start, resData.lun_wednesday_end,resData.lun_wednesday_notallow)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>T</strong> - '+checkCloseDate(resData.lun_thursday_start, resData.lun_thursday_end,resData.lun_thursday_notallow)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>F</strong> - '+checkCloseDate(resData.lun_friday_start, resData.lun_friday_end,resData.lun_friday_notallow)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>S</strong> - '+checkCloseDate(resData.lun_saturday_start, resData.lun_saturday_end,resData.lun_saturday_notallow)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>S</strong> - '+checkCloseDate(resData.lun_sunday_start, resData.lun_sunday_end,resData.lun_sunday_notallow)+'</p><br>';
				
$('#LunchOpeningHoursDiv').html(htmlDatadelivery);	
} else {
	$('#lunchId').hide();
	$('#LunchOpeningHoursDiv').hide();
}

if(sittingStaArr[2]==0) {

// Delivery box
$('#dineId').html('Dinein Hours ('+sittingArr[2]+')');
htmlDatadelivery='<p style="margin:0; padding:0;" ><strong>M</strong> - '+checkCloseDate(resData.dinner_monday_start, resData.dinner_monday_end,resData.dinner_monday_notallow)+' </p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>T </strong>- '+checkCloseDate(resData.dinner_tuesday_start, resData.dinner_tuesday_end,resData.dinner_tuesday_notallow)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>W</strong> - '+checkCloseDate(resData.dinner_wednesday_start, resData.dinner_wednesday_end,resData.dinner_wednesday_notallow)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>T</strong> - '+checkCloseDate(resData.dinner_thursday_start, resData.dinner_thursday_end,resData.dinner_thursday_notallow)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>F</strong> - '+checkCloseDate(resData.dinner_friday_start, resData.dinner_friday_end,resData.dinner_friday_notallow)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>S</strong> - '+checkCloseDate(resData.dinner_saturday_start, resData.dinner_saturday_end,resData.dinner_saturday_notallow)+'</p><br>';
htmlDatadelivery+='<p style="margin:0; padding:0;"><strong>S</strong> - '+checkCloseDate(resData.dinner_sunday_start, resData.dinner_sunday_end,resData.dinner_sunday_notallow)+'</p><br>';
				
$('#DinnerOpeningHoursDiv').html(htmlDatadelivery);	

} else {
	$('#dineId').hide();
	$('#DinnerOpeningHoursDiv').hide();
}
headerHtml('Restaurant Details');

function checkCloseDate(str,end,na) {
	if(na==0) {
		return str+' - '+ end;
	} else {
		return 'Closed';
	}
}
