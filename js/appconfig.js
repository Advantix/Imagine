//$('#typography').live('pageshow', function(event) {	
	//if(checkConnection()) {
		getAppConfig();
	//}
//});

$.ajaxSetup({ cache: false });
function getAppConfig() {
		
		data= window.localStorage.getItem('configData'); 
		//window.localStorage.setItem('configData',JSON.stringify(data)); // store local storage		
		if(data!==null) {	
			var data = JSON.parse(data);
			
			htmlOption='<select onchange="setResLoc(this.value)"><option>--Select Restaurant Location---</option>';
			var rest = data.RestInfo;
			$.each(rest, function(index, res) {
				var restDetval = window.localStorage.getItem('RestInfoDet');
				if(restDetval!=null) {
					var restDet = JSON.parse(restDetval);
					if(restDet.id==res.id) {
						htmlOption+='<option value='+index+' selected>'+res.restaurant_name+'('+res.restaurant_location+')</option>';
					} else {
						htmlOption+='<option value='+index+'>'+res.restaurant_name+'('+res.restaurant_location+')</option>';
					}
				} else {
					htmlOption+='<option value='+index+'>'+res.restaurant_name+'('+res.restaurant_location+')</option>';
					$('#homeButtonId').hide();
				}
				
			});
			htmlOption+='</select>';
			$('#resLocationId').html(htmlOption);
		
		}
		if(resData==null) {
			if(dataAppConfig!=null) {
				headerHtml(dataAppConfig.AppConfig.store_name);
			} 
		} else {
			headerHtml(resData.restaurant_name);
		}
}
function setResLoc(restId) {
	window.localStorage.setItem('RestInfoDetIndex',restId); // store local storage
	var restDet = JSON.parse(window.localStorage.getItem('configData'));
	window.localStorage.setItem('RestInfoDet',JSON.stringify(restDet.RestInfo[restId])); // store local storage
	window.location.href='index.html';
}