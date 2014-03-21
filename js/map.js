if(dataAppConfig==null || resData==null) {
	window.location.href='index.html';
}

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
									zoom: 15
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
headerHtml('Restaurant Details');
