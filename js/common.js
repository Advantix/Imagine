var itemImgURL = "http://advantixcrm.com/prj/mitech/images/item/";
var defaultImgURL = "logo_miapps.png";
var serviceAppURL = "http://advantixcrm.com/prj/mitech/index.php/api/appconfig/Mw";
var serviceMenuURL = "http://advantixcrm.com/prj/mitech/index.php/api/catlist/Mw";
var store_id= 'Mw';
var serviceURL = "http://advantixcrm.com/prj/mitech/index.php/api/";

var dataAppConfig = JSON.parse(window.localStorage.getItem('configData'));

if(dataAppConfig!=null) {		
	$("#bodyId").css("background-image", "url("+dataAppConfig.AppConfig.bg_image+")");
	$("#bodyId").css("background-repeat", "no-repeat");
	$("#bodyId").css("background-position", "center");
	file_name=get_path_filename();
	htmlData='<div style="float:left; text-align:center; width:100%;"><h1>'+dataAppConfig.AppConfig.store_name+'</h1></div><div class="ui-top-icon">';
	if(file_name=='index.html') { 
		htmlData+='<a href="register.html" rel="external"><img src="img/singin-btn.png" alt=""></a>';
	} else {
		htmlData+='<a href="#" onclick="goPrevious();" rel="external"><img src="img/back_btn.png" alt=""></a>';
	}
	htmlData+='</div><div  class="ui-top-icon-right"> <a href="#"  onclick="refresh();" rel="external"><img src="img/refresh-btn.png" alt=""></a></div>';
	$('#headerContId').html(htmlData);
} 
//window.localStorage.removeItem('userData');
var userData = JSON.parse(window.localStorage.getItem('userData'));

var welcomeDiv = window.localStorage.getItem('welcomeDiv');

if(userData!=null) {
	var carDataGetcnt = JSON.parse(window.localStorage.getItem('carDatas'));
	var carDataGetDealCnt = JSON.parse(window.localStorage.getItem('dealItemsId'));
	
	
	if(carDataGetDealCnt!=null) {
		cartCount = 1;
	} else if(carDataGetcnt!=null) {
		var cartItemCntView=carDataGetcnt.items.length;
		cartCount = cartItemCntView;
	} else {
		cartCount = 0;
	}
	
	window.localStorage.setItem('welcomeDiv','Welcome <span style="margin-right:20px;color:#ff0000">'+userData.user_data.fname+'</span><span><a href="checkout.html" id="cartBtnId" rel="external" style="margin-right:10px;">Cart ['+cartCount+']</a></span><span ><a href="myaccount.html" rel="external">My Account</a>'); // store local storage
	var welcomeDiv = window.localStorage.getItem('welcomeDiv');
	
	$('#userName').html(welcomeDiv);
} else {
	var carDataGetcnt = JSON.parse(window.localStorage.getItem('carDatas'));
	var carDataGetDealCnt = JSON.parse(window.localStorage.getItem('dealItemsId'));
	
	
	if(carDataGetDealCnt!=null) {
		cartCount = 1;
	} else if(carDataGetcnt!=null) {
		var cartItemCntView=carDataGetcnt.items.length;
		cartCount = cartItemCntView;
	} else {
		cartCount = 0;
	}
	
	window.localStorage.setItem('welcomeDiv','Welcome <span style="margin-right:20px;color:#ff0000">Guest</span><span><a href="checkout.html" id="cartBtnId" rel="external" style="margin-right:10px;">Cart ['+cartCount+']</a></span><span ><a href="#" id="logoutBtnId" rel="external">Login</a>'); // store local storage
	var welcomeDiv = window.localStorage.getItem('welcomeDiv');
	$('#userName').html(welcomeDiv);
}




$("#logoutBtnId").click(function() {
	window.localStorage.removeItem('userData');
	$("#loginFrmId").show();
	$("#registerFrmId").hide();	
	$("#addrFrmId").hide();
	$("#userName").hide();
	window.localStorage.setItem('form_active','#loginFrmId'); // store local storage
	//window.localStorage.setItem('form_inactive','#registerFrmId'); // store local storage
	window.location.href='register.html';
});


function checkConnection() {
	var networkState = navigator.network.connection.type;

	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';

	if(states[networkState] == 'Unknown connection' || states[networkState] == 'No network connection') {
		alert('Connection type: ' + states[networkState]);
		return false;
	} else {
		alert('Connection type: ' + states[networkState]);
		return true;
	}
}

catId=getUrlVars()["catId"];
itemId=getUrlVars()["itemId"];
itemType=getUrlVars()["type"];
orderId=getUrlVars()["orderId"];

function goPrevious() { // used in showMenu.html

	history.go(-1);
	
}

function refresh() { // used in showMenu.html

	history.go(0);
	
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function get_path_filename() {
	var path=window.location.pathname;
	var Filename= path.split('/').pop();
	return Filename;
}
