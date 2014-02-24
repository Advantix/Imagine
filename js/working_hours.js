if(dataAppConfig==null) {
	window.location.href='index.html';
}
jQuery(document).ready(function () {
	var currentYr = (new Date).getFullYear() - 60;
	var endyear = currentYr+60;		
	$('input.one').simpleDatepicker({ startdate: currentYr, enddate: endyear });
});
headerHtml('Working Hours');
$('#sample1 input').ptTimeSelect();

$("#pageLoader").hide();	

// Register Post	
$("#hoursButtonId").click(function() {
	//$("#pageLoader").show();
	$('#hoursFrmId').submit();
});

$('#hoursFrmId').submit(function(){		
	var postData = $(this).serialize();
	var ordertype = JSON.parse(window.localStorage.getItem('takeordelivry'));	
	//alert(postData);
	$.ajax({
		type: 'POST',
		data: 'rest_id='+restId+'&ordertype='+ordertype+'&'+postData,
		url: serviceURL+'workinghours',
		success: function(data){	
			//alert(data);
			if(data.response==1) {
				window.localStorage.setItem('hoursinfo',JSON.stringify(data.hoursinfo)); // store local storage
				window.localStorage.setItem('holidaypercnt',JSON.stringify(data.percnt));				
				window.localStorage.setItem('minorderamt',JSON.stringify(data.minorder));
				console.log(data);
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