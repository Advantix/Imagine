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
	load_30days();
	getNumGuest();
	getSittingName();
	
	var bookingDetailsArr = window.localStorage.getItem('bookingDetailsArray');	

	if(bookingDetailsArr!=null) {
		var bookVal = JSON.parse(bookingDetailsArr);
		$('#booking_date').val(bookVal.booking_date);//alert(bookVal.seating);
		$('#comments').val(bookVal.comments=="" ? 'Additional Requests' : bookVal.comments);//alert(bookVal.seating);
		$('#num_guest_online').val(bookVal.num_gust_online);
		$('#num_guest_online-button span').html(bookVal.num_gust_online);
		if(bookVal.seating=='bkfst') { sittInd=0;} else if(bookVal.seating=='lunch') { sittInd=1;} else if(bookVal.seating=='dinner') { sittInd=2;}
		$('#seating').val(bookVal.seating); //alert(bookVal.seating);
		$('#seating-button span').html(sittingArr[sittInd]);
		loadtimediv('');
		setTimeout(function() {
			 var labelidDef=bookVal.time_val;//alert(labelidDef);
			//$("#"+labelidDef+" a").css({"background":'#BFC4C4'});
			if(labelidDef!=0) {
				$("#time_validate").val(labelidDef);
				$("#timediv").html(labelidDef);
				$("#timediv-button span").html(tConvert(labelidDef.replace('_',':')));
			}
		}, 700);
		
		//alert(bookVal.time_val);
	} else {
		$('#num_guest_online').val(resData.min_gust_per_online_bk);
		$('#num_guest_online-button span').html(resData.min_gust_per_online_bk);
		$('#seating').val('0');
		$('#seating-button span').html('Select Sitting');
		currDate = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
		$('#booking_date').val(currDate);//alert(bookVal.num_gust_online);
	}
	dateChange('');
});

function getNumGuest() {
	resDataMinGuest=resData.min_gust_per_online_bk;
	resDataMaxGuest=resData.max_gust_per_online_bk;
	numGuestHtml='<option value="0">Select</option>';
	for(i=resDataMinGuest;i<=resDataMaxGuest;i++){	
		
		numGuestHtml+='<option value='+i+'>'+i+'</option>';
	}		
	//numGuestHtml+='';
	$('#num_guest_online').html(numGuestHtml);	
	
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
		numGuestHtml='<option value="0">Select Sitting</option>';
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
			
			$('#timediv').html('<option value="0">Select</option>');
			$("#timediv-button span").html('Select');
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
			//alert(serviceURL+'timedetails/'+d+'/'+n+'/'+restId+'/'+store_id+'/'+seating);
			
			$.getJSON(serviceURL+'timedetails/'+d+'/'+restId+'/'+store_id+'/'+seating, function(data) {	
				
				//alert(JSON.stringify(data));
				//alert(data['time_'+seating]);
				var bkfstStr = (data['time_'+seating]=== undefined ? data['time_rst'] : data['time_'+seating]);	
				//	alert(bkfstStr);
			//	var	bkfst=bkfstStr.split(",");
					//alert(bkfst);
					
					bkfstStrCnt=bkfstStr.length;
					timHtml='';
					if(bkfstStr.close_rest!==1) {
						
						if(bkfstStrCnt > 0) {
							timHtml+='<option value="0">Select</option>';
							i=0;
							$.each(bkfstStr, function(index, bkfst) {
								//alert(index+":"+bkfst);	
								if(i==0) { pos='a';} else if(i==1){pos='b';} else if (i==2) { pos='c';}
								i++;
								timHtml+= '<option value="'+bkfst.replace(':','_')+'">'+tConvert(bkfst)+'</option>';					
									//alert((bkfstStrCnt%3));
								if(((index+1)%3)==0) {
									//alert("dfs");
									//timHtml+= '</div><div class="ui-grid-b ui-responsive">';
									i=0;
								}
							});
							
							//timHtml+= '';
							$('#timediv').html(timHtml);
							
							var bookingDetailsArr = window.localStorage.getItem('bookingDetailsArray');	
							if(bookingDetailsArr==null) {
								//$("#displayTimeId").html(bkfstStr[0]+'<span>Arrival Time</span>');
								//defTime=bkfstStr[0];
								//$("#time_validate").val(defTime.replace(':','_'));
								changecolor(bkfstStr[0].replace(':','_'));	
							} else {
								var bookVal = JSON.parse(bookingDetailsArr);
								setSel=$('#seating').val(); 
								dateSel=$('#booking_date').val();
								if(bookVal.seating==setSel && bookVal.booking_date==dateSel) {
									var labelidDef=bookVal.time_val;//alert(labelidDef);
									changecolor(labelidDef);
									
								} else {
									changecolor(bkfstStr[0].replace(':','_'));	
								}								
							}						
						} else {							
							if(seating=='bkfst') { set=0;} else if(seating=='lunch') {set=1;} else if(seating=='dinner') {set=2;}else {set='Select';}
							if(sittingArr[set]==null) {
								sitVal=tConvert(set);
							} else {
								//alert("We are unable to accept your reservation online at this time, please contact restaurant");
								sitVal=sittingArr[set]+' Not Available for Selected Day';
							}
								
							timHtml+='<option value="0">'+sitVal+'</option>';
												
							$("#time_validate").val('');							
							$('#timediv').html(timHtml);
							$("#timediv-button span").html(sitVal);
						}
						
					} else {
						timHtml+='<option value="0">Restaurant has been closed on selected date.</option>';
						$('#timediv').html(timHtml);
						$("#timediv-button span").html('Restaurant has been closed on selected date.');
					}
			});	
		} else {
			$('#seating').val('0');
			$('#seating-button span').html('Select sitting');
			alert('Please Select Number of Guest');
		}
		
	}
	
	function changecolor(labelid){
		//alert(labelid);		
		//$('#timediv div a').css({"background":'#F4F5F5'});
		//$("#"+labelid+" a").css({"background":'#BFC4C4'});
		if(labelid!=0) {
			$("#time_validate").val(labelid);
			$("#timediv").val(labelid);
			$("#timediv-button span").html(tConvert(labelid.replace('_',':')));
		} else {
			$("#time_validate").val('');
			$("#timediv").val(0);
			$("#timediv-button span").html('Select');
		}
		
	}
	

	
$("#bookingButtonId").click(function() {	
	
	$('#pageLoader').show();
	time=$('#time_validate').val();
	numGuestSel=$( "#num_guest_online option:selected" ).val();//alert(numGuestSel);
	if(numGuestSel==0) {
		alert("Please Select Number of Guest");
		$('#pageLoader').hide();
	} else if(time!="") {
		var booking_date = $('#booking_date').val();
		var commentsVal = $('#comments').val();
		commentsVal = commentsVal !="Additional Requests" ? commentsVal: "";
		var num_guest = $('select[name="num_guest_online"]').val();
			//alert(serviceURL+'timevalidate/'+time+'/'+booking_date+'/'+restId+'/'+num_guest+'/'+store_id);
			$.getJSON(serviceURL+'timevalidate/'+time+'/'+booking_date+'/'+restId+'/'+num_guest+'/'+store_id, function(data) {
				//alert(data.response);
				if(data.response==='A') {
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
					
				} else if(data.response==='NA') {
					alert('We are unable to accept your reservation online at this time, please contact restaurant');
					$('#pageLoader').hide();
				} else {
					available = data.response;
					alert('Only '+available+' seats available');
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

function dateChange(type) {
	//alert(type);
	$('#time_validate').val('');
			
	$('#timediv').html('<option value="0">Select</option>');
	$("#timediv-button span").html('Select');
	if(type!='') {
		$('#seating').val('0');
		$('#seating-button span').html('Select sitting');
	}
			
	var booking_date = $('#booking_date').val();
	
	var today = new Date(); 
	var da = today.getDate();
	var dm = today.getMonth()+1;
	currDate = today.getFullYear()+'-'+(dm<10 ? '0'+dm: dm)+'-'+(da<10 ? '0'+da: da);
	
	//alert(currDate);
	dArr=booking_date.split('-');
	if(dArr[0]<2000) {
		dateGiven=dArr[2]+'-'+(dArr[1]<10 ? '0'+dArr[1]: dArr[1])+'-'+(dArr[0]<10 ? '0'+dArr[0]: dArr[0]);
		var nex = new Date(dateGiven); //alert(nex);
		if(type=='Next') {	
			nex.setDate(nex.getDate() + 1);		
		} else if(type=='Prev') {	
			nex.setDate(nex.getDate() - 1);		
		} 
		var dmNex = nex.getMonth()+1;		
		var dyNex = nex.getFullYear();
		var daNex = nex.getDate();			
			
		dateGiven = dyNex+'-'+(dmNex<10 ? '0'+dmNex: dmNex)+'-'+(daNex<10 ? '0'+daNex: daNex);			
		dateGivenHidden=daNex+'-'+dmNex+'-'+dyNex;
		var cmp = fn_DateCompare(dateGiven,currDate);
	}
	//alert(dateGivenHidden);
	//alert(cmp);
	if(cmp==0 || cmp==1) {
		var booking_date = $('#booking_date').val(dateGivenHidden);
		//alert(booking_date);
		var frmDat = getDateFormat(dateGiven,'date');
		var sepDay = frmDat.split(" ");
		
		ordinal = sepDay[1] + (sepDay[1]>10 && sepDay[1]<20 ? 'th' : {1:'st', 2:'nd', 3:'rd'}[sepDay[1] % 10] || 'th');
		DateShow = sepDay[0].slice(0,3)+", "+ordinal+" "+sepDay[2].slice(0,3)+" "+sepDay[3];
		
		$('#dateDrop').val(dateGiven);
		$('#dateDrop-button span').html(DateShow);
		$("#dayP").html(sepDay[0]);
		$("#dateP").html(sepDay[1]+" "+sepDay[2].slice(0,3)+" "+sepDay[3]);
		//alert(sepDay[0]);
	} else {
		alert('Please select greater than or equal to current date');
	}
}

function fn_DateCompare(DateA, DateB) {

	 // alert(DateA+":"+DateB);
      var a = new Date(DateA);
      var b = new Date(DateB);

      var msDateA = Date.UTC(a.getFullYear(), a.getMonth()+1, a.getDate());
      var msDateB = Date.UTC(b.getFullYear(), b.getMonth()+1, b.getDate());
	  //alert(msDateA+":"+msDateB);
      if (parseFloat(msDateA) < parseFloat(msDateB))
        return -1;  // less than
      else if (parseFloat(msDateA) == parseFloat(msDateB))
        return 0;  // equal
      else if (parseFloat(msDateA) > parseFloat(msDateB))
        return 1;  // greater than
      else
        return null;  // error
  }
  function load_30days() {	
	days30Html="";
	for(i=0;i<30;i++){	
		var today = new Date(); 
		today.setDate(today.getDate() + i);
		var da = today.getDate();		
		var dm = today.getMonth()+1;
		currDate = today.getFullYear()+'-'+(dm<10 ? '0'+dm: dm)+'-'+(da<10 ? '0'+da: da);
		
		var nex = new Date(currDate); //alert(nex);
		
		//nex.setDate(nex.getDate() + i);		
		 
		var dmNex = nex.getMonth()+1;		
		var dyNex = nex.getFullYear();		
		var daNex = nex.getDate();		
		
		dateGiven = dyNex+'-'+(dmNex<10 ? '0'+dmNex: dmNex)+'-'+(daNex<10 ? '0'+daNex: daNex);			
		dateGivenHidden=daNex+'-'+dmNex+'-'+dyNex;
		
		var frmDat = getDateFormat(dateGiven,'date');
		var sepDay = frmDat.split(" ");
		ordinal = sepDay[1] + (sepDay[1]>10 && sepDay[1]<20 ? 'th' : {1:'st', 2:'nd', 3:'rd'}[sepDay[1] % 10] || 'th');
		DateShow = sepDay[0].slice(0,3)+",<br> "+ordinal+" "+sepDay[2].slice(0,3)+" "+sepDay[3];
		
		days30Html+='<option value='+dateGivenHidden+'>'+DateShow+'</option>';
	}		
	//numGuestHtml+='';
	$('#dateDrop').html(days30Html);	
  }
  function setDateHidden(val){
	$('#time_validate').val('');
			
	$('#timediv').html('<option value="0">Select</option>');
	$("#timediv-button span").html('Select');
	$('#seating').val('0');
	$('#seating-button span').html('Select sitting');
			
	$('#booking_date').val(val);
	$("#dropDateId").hide();
	$("#dropHtmlDateId").show();
	
	var booking_date = $('#booking_date').val();
	dArr=booking_date.split('-');
	if(dArr[0]<2000) {
		dateGiven=dArr[2]+'-'+(dArr[1]<10 ? '0'+dArr[1]: dArr[1])+'-'+(dArr[0]<10 ? '0'+dArr[0]: dArr[0]);
		var nex = new Date(dateGiven); //alert(nex);
		
		var dmNex = nex.getMonth()+1;		
		var dyNex = nex.getFullYear();
		var daNex = nex.getDate();			
			
		dateGiven = dyNex+'-'+(dmNex<10 ? '0'+dmNex: dmNex)+'-'+(daNex<10 ? '0'+daNex: daNex);			
		
	}
	var frmDat = getDateFormat(dateGiven,'date');
	var sepDay = frmDat.split(" ");
	
	$("#dayP").html(sepDay[0]);
	$("#dateP").html(sepDay[1]+" "+sepDay[2].slice(0,3)+" "+sepDay[3]);
  }
  function showDateDrop(val) {
	//alert(val);
	if(val!="out") {
		$("#dropDateId").show();
		$("#dropHtmlDateId").hide();
	} else {
		$("#dropDateId").hide();
		$("#dropHtmlDateId").show();
	}
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