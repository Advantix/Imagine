if(dataAppConfig==null || resData==null) {
	window.location.href='index.html';
}
jQuery(document).ready(function () {
	var currentYr = (new Date).getFullYear();
	var startYr = (new Date).getFullYear();
	var endyear = currentYr+2;//new Date().getTime() + (30 * 24 * 60 * 60 * 1000);  
	var today = new Date(); 
	var targetDate= new Date();
	targetDate.setDate(today.getDate()+ 60);
	$('input.one').simpleDatepicker({ startdate: new Date(), enddate: endyear });	
	
	getNumGuest();
	
	var bookingDetailsArr = window.localStorage.getItem('bookingDetailsArray');	

	if(bookingDetailsArr!=null) {
		var bookVal = JSON.parse(bookingDetailsArr);
		$('#booking_date').val(bookVal.booking_date);//alert(bookVal.num_gust_online);
		$('#num_guest_online').val(bookVal.num_gust_online);
		$('#num_guest_online-button span').html(bookVal.num_gust_online);
		$('#seating').val(bookVal.seating);
		loadtimediv();
		setTimeout(function() {
			 var labelidDef=bookVal.time_val;//alert(labelidDef);
			$("#"+labelidDef+" a").css({"background":'#BFC4C4'});
			if(labelidDef!=0) {
				$("#time_validate").val(labelidDef);
			}
		}, 500);
		
		//alert(bookVal.time_val);
	}
});

function getNumGuest() {
	resDataMinGuest=resData.min_gust_per_online_bk;
	resDataMaxGuest=resData.max_gust_per_online_bk;
	numGuestHtml='';
	for(i=resDataMinGuest;i<=resDataMaxGuest;i++){	
		
		numGuestHtml+='<option value='+i+'>'+i+'</option>';
	}		
	$('#num_guest_online').html(numGuestHtml);	
	
}


	function loadtimediv(){
		numGuestSel=$( "#num_guest_online option:selected" ).val();//alert(numGuestSel);
		var d = $('#booking_date').val();			
		if(numGuestSel!="0" && d!="") {
			
			

			var seating = $('select[name="seating"]').val();
			
			//alert(d+":"+dtstring+":"+seating);
			
			$('#timediv').html("<div id='popup'><div id='center'><img src='data/loader.gif' style='color: #FFFFFF;' alt='Loading...' align='absmiddle'></div></div>");
			
			//alert(serviceURL+'timedetails/'+d+'/'+n+'/'+restId+'/'+store_id+'/'+seating);
			
			$.getJSON(serviceURL+'timedetails/'+d+'/'+restId+'/'+store_id+'/'+seating, function(data) {	
				
				//alert(JSON.stringify(data));
				//alert(data['time_'+seating]);
				var bkfstStr = (data['time_'+seating]=== undefined ? data['time_rst'] : data['time_'+seating]);	
				//	alert(bkfstStr);
			//	var	bkfst=bkfstStr.split(",");
					//alert(bkfst);
					timHtml='<div class="ui-grid-b ui-responsive">';
					bkfstStrCnt=bkfstStr.length;
					
					if(bkfstStr.close_rest!==1) {
						
						if(bkfstStrCnt > 0) {
							i=0;
							$.each(bkfstStr, function(index, bkfst) {
								//alert(index+":"+bkfst);	
								if(i==0) { pos='a';} else if(i==1){pos='b';} else if (i==2) { pos='c';}
								i++;
								timHtml+= '<div class="ui-block-'+pos+'" id="'+bkfst.replace(':','_')+'"><a href="#" class="ui-btn ui-shadow ui-corner-all" onclick=\'changecolor("'+bkfst.replace(':','_')+'")\'>'+bkfst+'</a></div>';					
									//alert((bkfstStrCnt%3));
								if(((index+1)%3)==0) {
									//alert("dfs");
									timHtml+= '</div><div class="ui-grid-b ui-responsive">';
									i=0;
								}
							});
						} else {
							if(seating=='bkfst') { set='Breakfast';} else if(seating=='lunch') {set='Lunch';} else if(seating=='dinner') {set='Dinner';}
							timHtml+='<b class="ValidationErrors">'+set+' Not Available for Selected Day</b></div>';
						}
						$('#timediv').html(timHtml);
					} else {
						timHtml+='<b class="ValidationErrors">Restaurant has been closed on selected date.</b></div>';
						$('#timediv').html(timHtml);
					}
			});	
		} else {
			alert('Please Select Number of Guest');
			$('#seating').val('Select seating');
		}
		
	}
	
	function changecolor(labelid){
		//alert(labelid);		
		$('#timediv div a').css({"background":'#F4F5F5'});
		$("#"+labelid+" a").css({"background":'#BFC4C4'});
		if(labelid!=0) {
			$("#time_validate").val(labelid);
		}
		
	}
	
	
$("#bookingButtonId").click(function() {	
	
	time=$('#time_validate').val();
	
	if(time!="") {
		var booking_date = $('#booking_date').val();
		var num_guest = $('select[name="num_guest_online"]').val();
			//alert(serviceURL+'timevalidate/'+time+'/'+booking_date+'/'+restId+'/'+num_guest+'/'+store_id);
			$.getJSON(serviceURL+'timevalidate/'+time+'/'+booking_date+'/'+restId+'/'+num_guest+'/'+store_id, function(data) {
				//alert(data.response);
				if(data.response==0) {
					var bookingDetails={"booking_date": booking_date,
							"time_val":$('#time_validate').val(),
							"num_gust_online":num_guest,
							"seating":$('select[name="seating"]').val()
							};
					window.localStorage.setItem('bookingDetailsArray',JSON.stringify(bookingDetails)); // store local storage	
					window.location.href='dinein_user.html';	
					
				} else {
					alert('No seats available your chosen time');
				}

			//var bookingDetailsArr = window.localStorage.getItem('bookingDetailsArray');	

			//var bookVal = JSON.parse(bookingDetailsArr);
			//alert(bookVal.time_val);
			});
		} else {
			alert("Please Select the time to book");
		}
});
