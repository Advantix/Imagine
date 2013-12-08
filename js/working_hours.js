/* if(dataAppConfig==null || userData==null) {
	window.location.href='index.html';
} */
jQuery(document).ready(function () {
	var currentYr = (new Date).getFullYear() - 60;
	var endyear = currentYr+60;		
	$('input.one').simpleDatepicker({ startdate: currentYr, enddate: endyear });
});

$('#sample1 input').ptTimeSelect();

$("#pageLoader").hide();	

// Register Post	
$("#hoursButtonId").click(function() {
	//$("#pageLoader").show();
	$('#hoursFrmId').submit();
});

$('#hoursFrmId').submit(function(){		
	var postData = $(this).serialize();	
	//alert(postData);
	$.ajax({
		type: 'POST',
		data: 'rest_id='+restId+'&'+postData,
		url: serviceURL+'workinghours',
		success: function(data){				
			if(data.response==1) {
				window.localStorage.setItem('hoursinfo',JSON.stringify(data.hoursinfo)); // store local storage
				window.localStorage.setItem('holidaypercnt',JSON.stringify(data.percnt));
				console.log(data);
				//alert(data.hoursinfo);
				alert('Time selected successfully');
				window.location.href='checkout.html';
			}else{
				console.log(data);				
				alert(data.response);
			}
		},
		error: function(data){
			console.log(data);
			alert('There was an error adding your comment');
		}
	});
	
	return false;
});