//$('#typography').live('pageshow', function(event) {	
	//if(checkConnection()) {
		getAppConfig();
	//}
//});

$.ajaxSetup({ cache: false });
function getAppConfig() {
		data=dataAppConfig; 
		//window.localStorage.setItem('configData',JSON.stringify(data)); // store local storage		
		
		if(data!==null) {			
			$("#bodyId").css("background-image", "url("+data.AppConfig.bg_image+")");
			$("#bodyId").css("background-repeat", "repeat-x");
			$("#bodyId").css("background-position", "top");
			$("#bodyId").css("background-color", "#000");
		
		
			htmlOption='<select onchange="setResLoc(this.value)"><option>--Select Restarunt Location---</option>';
			var rest = data.RestInfo;
			$.each(rest, function(index, res) {
				var restDet = JSON.parse(window.localStorage.getItem('RestInfoDet'));
				if(restDet!=null) {
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
}
function setResLoc(restId) {
	window.localStorage.setItem('RestInfoDetIndex',restId); // store local storage
	var restDet = JSON.parse(window.localStorage.getItem('configData'));
	window.localStorage.setItem('RestInfoDet',JSON.stringify(restDet.RestInfo[restId])); // store local storage
	window.location.href='home.html';
}