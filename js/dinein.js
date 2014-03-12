if(dataAppConfig==null || resData==null) {
	window.location.href='index.html';
}
// sitting details 
sitStaVa = resData.sitting_status;
sittingStaArr = sitStaVa.split('-');

sitVa = resData.sitting;	
sittingArr = sitVa.split('||');
sittingArrLen=sittingArr.length;//alert(sittingArrLen);
var sittingValuArr=new Array(3);
sittingValuArr[0] = 'bkfst';
sittingValuArr[1] = 'lunch'
sittingValuArr[2] = 'dinner';


jQuery(document).ready(function () {
	headerHtml('Reservation');	
	var currentYr = (new Date).getFullYear();
	var startYr = (new Date).getFullYear();
	var endyear = currentYr+2;//new Date().getTime() + (30 * 24 * 60 * 60 * 1000);  
	var today = new Date(); 
	var targetDate= new Date();
	targetDate.setDate(today.getDate()+ 60);
	$('input.one').simpleDatepicker({ startdate: new Date(), enddate: endyear });	
	
	getNumGuest();
	getSittingName();
	
	var bookingDetailsArr = window.localStorage.getItem('bookingDetailsArray');	

	if(bookingDetailsArr!=null) {
		var bookVal = JSON.parse(bookingDetailsArr);
		$('#booking_date').val(bookVal.booking_date);//alert(bookVal.seating);
		$('#comments').val(bookVal.comments);//alert(bookVal.seating);
		$('#num_guest_online').val(bookVal.num_gust_online);
		$('#num_guest_online-button span').html(bookVal.num_gust_online);
		if(bookVal.seating=='bkfst') { sittInd=0;} else if(bookVal.seating=='lunch') { sittInd=1;} else if(bookVal.seating=='dinner') { sittInd=2;}
		$('#seating').val(bookVal.seating); //alert(bookVal.seating);
		$('#seating-button span').html(sittingArr[sittInd]);
		loadtimediv('');
		setTimeout(function() {
			 var labelidDef=bookVal.time_val;//alert(labelidDef);
			$("#"+labelidDef+" a").css({"background":'#BFC4C4'});
			if(labelidDef!=0) {
				$("#time_validate").val(labelidDef);
				$("#displayTimeId").html(labelidDef.replace('_',':')+'<span>Arrival Time</span>');
			}
		}, 700);
		
		//alert(bookVal.time_val);
	} else {
		$('#num_guest_online').val(resData.min_gust_per_online_bk);
		$('#num_guest_online-button span').html(resData.min_gust_per_online_bk);
		$('#seating').val('Select Sitting');
		$('#seating-button span').html('Select Sitting');
		currDate = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
		$('#booking_date').val(currDate);//alert(bookVal.num_gust_online);
	}
});

function getNumGuest() {
	resDataMinGuest=resData.min_gust_per_online_bk;
	resDataMaxGuest=resData.max_gust_per_online_bk;
	numGuestHtml='<select id="num_guest_online" name="num_guest_online" data-shadow="false">';
	for(i=resDataMinGuest;i<=resDataMaxGuest;i++){	
		
		numGuestHtml+='<option value='+i+'>'+i+'</option>';
	}		
	numGuestHtml+='</select><br><span>#Guest</span>';
	$('#num_guest_online_a').html(numGuestHtml);	
	
}
function getSittingName() {	
	var settLenEna=0;
	for(i=0;i<sittingArrLen;i++){	
		if(sittingStaArr[i]==0) {
			settLenEna++;
		}
	}	
	//alert(settLenEna);
	//alert(sittingValuArr);
	if(settLenEna>1) {
		$("#time_validate").val('');			
		$('#seatingDrop').show();	
		$('#seating_text').val('');
		numGuestHtml='<option>Select Sitting</option>';
		for(j=0;j<sittingArrLen;j++){	
			if(sittingStaArr[j]==0) {
				numGuestHtml+='<option value='+sittingValuArr[j]+'>'+sittingArr[j]+'</option>';
			}
		}				
		$('#seating').html(numGuestHtml);			
	} else {
		$("#time_validate").val('');		
		$('#seatingDrop').hide();	
		for(k=0;k<sittingArrLen;k++){	
			//alert(k);
			//alert(sittingStaArr[k]);
			//alert(sittingValuArr[k]);
			if(sittingStaArr[k]==0) {
				$('#seating_text').val(sittingValuArr[k]);				
			}
		}
		setTimeout(function() {
			loadtimediv('drop');
		}, 500);
		
	}
	
}

	function loadtimediv(onCh){
		if(onCh=='drop') {
			$('#time_validate').val('');
			$('#displayTimeId').html('Loading...<span>Arrival Time</span>');
		}
		
		numGuestSel=$( "#num_guest_online option:selected" ).val();//alert(numGuestSel);
		
		var d = $('#booking_date').val();			
		if(numGuestSel!="0" && d!="") {
			
			
			seatTxtBoxVal=$('#seating_text').val();//alert(seatTxtBoxVal);
			if(seatTxtBoxVal=="") {
				var seating = $('select[name="seating"]').val(); //alert(seating);
			} else {
				seating=seatTxtBoxVal;
			}
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
					timHtml='<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><div role="main" class="ui-content clearfix"><h3 class="ui-title">Change your time</h3>';
					bkfstStrCnt=bkfstStr.length;
					
					if(bkfstStr.close_rest!==1) {
						
						if(bkfstStrCnt > 0) {
							i=0;
							$.each(bkfstStr, function(index, bkfst) {
								//alert(index+":"+bkfst);	
								if(i==0) { pos='a';} else if(i==1){pos='b';} else if (i==2) { pos='c';}
								i++;
								timHtml+= '<div class="time_wrap" id="'+bkfst.replace(':','_')+'"><a href="#" class="ui-btn ui-shadow ui-corner-all" onclick=\'changecolor("'+bkfst.replace(':','_')+'")\'>'+bkfst+'</a></div>';					
									//alert((bkfstStrCnt%3));
								if(((index+1)%3)==0) {
									//alert("dfs");
									//timHtml+= '</div><div class="ui-grid-b ui-responsive">';
									i=0;
								}
							});
							var bookingDetailsArr = window.localStorage.getItem('bookingDetailsArray');	
							if(bookingDetailsArr==null) {
								$("#displayTimeId").html(bkfstStr[0]+'<span>Arrival Time</span>');
								defTime=bkfstStr[0];
								$("#time_validate").val(defTime.replace(':','_'));
							}
						} else {
							if(seating=='bkfst') { set='Breakfast';} else if(seating=='lunch') {set='Lunch';} else if(seating=='dinner') {set='Dinner';}else {set='Select Sitting';}
							timHtml+='<div class="ValidationErrors">'+set+' Not Available for Selected Day</b></div>';
						}
						timHtml+= '</div>';
						$('#timediv').html(timHtml);
					} else {
						timHtml+='<b class="ValidationErrors">Restaurant has been closed on selected date.</b></div>';
						$('#timediv').html(timHtml);
					}
			});	
		} else {
			alert('Please Select Number of Guest');
			$('#seating').val('Select sitting');
		}
		
	}
	
	function changecolor(labelid){
		//alert(labelid);		
		$('#timediv div a').css({"background":'#F4F5F5'});
		$("#"+labelid+" a").css({"background":'#BFC4C4'});
		if(labelid!=0) {
			$("#time_validate").val(labelid);
			$("#displayTimeId").html(labelid.replace('_',':')+'<span>Arrival Time</span>');
		}
		
	}
	
	
$("#bookingButtonId").click(function() {	
	
	$('#pageLoader').show();
	time=$('#time_validate').val();
	
	if(time!="") {
		var booking_date = $('#booking_date').val();
		var commentsVal = $('#comments').val();
		var num_guest = $('select[name="num_guest_online"]').val();
			//alert(serviceURL+'timevalidate/'+time+'/'+booking_date+'/'+restId+'/'+num_guest+'/'+store_id);
			$.getJSON(serviceURL+'timevalidate/'+time+'/'+booking_date+'/'+restId+'/'+num_guest+'/'+store_id, function(data) {
				//alert(data.response);
				if(data.response==0) {
					seatTxtBoxVal=$('#seating_text').val();//alert(seatTxtBoxVal);
					if(seatTxtBoxVal=="") {
						var seating = $('select[name="seating"]').val(); //alert(seating);
					} else {
						seating=seatTxtBoxVal;
					}
					var bookingDetails={"booking_date": booking_date,
							"time_val":$('#time_validate').val(),
							"num_gust_online":num_guest,
							"comments":commentsVal,
							"seating":seating
							};
					window.localStorage.setItem('bookingDetailsArray',JSON.stringify(bookingDetails)); // store local storage	
					window.location.href='dinein_user.html';	
					
				} else {
					alert('No seats available your chosen time');
					$('#pageLoader').hide();
				}

			//var bookingDetailsArr = window.localStorage.getItem('bookingDetailsArray');	

			//var bookVal = JSON.parse(bookingDetailsArr);
			//alert(bookVal.time_val);
			});
		} else {
			alert("Please Select the time to book");
			$('#pageLoader').hide();
		}
});
