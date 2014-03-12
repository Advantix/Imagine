function trim(sStr)
{
   var s;
   sStr = sStr.toString();
   sStr = sStr.replace(/(^\s*)|(\s*$)/g,"");
   sStr = sStr.replace(/\s{2,}/g," "); /*----- Removes the unwanted spaces(more than one)-----*/
   return(sStr);
}/*---- Regular expression functions for clearing the spaces ----*/



function clear_spaces(formName)
{
	var element_all =  formName.elements;
	var i;
	for(i=0;i<element_all.length;++i)
	{
			if ((element_all[i].type == "text")||(element_all[i].type == "textarea"))
				element_all[i].value = trim(element_all[i].value);
	}
}/*----- Trim all the text boxes Only-----*/

function checkText(obj,defaultTxt)
{
	if(defaultTxt!=obj.value) {
		/*-----The trim function has to be called before calling this function -----*/
		/*---- Later , type will be passed as a parameter so that the type will be like email, phone no , numeric, character ---*/

		if(obj.value == "")
			{
				return false;
			}
		else {
			return true;
		}
	} else {
		return false;
	}
}/*---- Checks the text box for empty string -----*/

function checkConfPassword(obj1,obj2)
{
	//alert(obj1+"&"+obj2);
/*-----The trim function has to be called before calling this function -----*/

if(obj1.value != "" && obj2.value != "")
	{
		if(trim(obj1.value) != trim(obj2.value))
		return false;
		else
		return true;
	}
else
	return false;
}/*---- Checks the cofirm password and password are same -----*/

function checkCombo(obj)
{
/*-----The trim function has to be called before calling this function -----*/
/*---- Later , type will be passed as a parameter so that the type will be like email, phone no , numeric, character ---*/
if(trim(obj.value) == "0")
	{
//		alert("Please enter the "+name);
		//obj.focus();
		return false;
	}
else
	return true;
}/*---- Checks the text box for empty string -----*/


function checkEqual(string1,string2)
{
	var retVal = (string1 === string2) ? true : false;
	return retVal;
}/*-----checkEqual()----*/

function checkSelected(obj)
{
	//alert(obj);
	/*if(obj.options[obj.selectedIndex].value == 0 )
		return false;
	else
	return true;*/
return (obj.options[obj.selectedIndex].value == 0 ) ? false : true;
//alert(obj.selectedIndex);
//return (obj.selectedIndex == -1 ) ? false : true;
}/*----checkSelected()-----*/

function checkMSelected(obj)
{
	//alert(obj);
var i = 0;
for( i =0 ;i< obj.length; i++)
	{
	 if ((obj[i].selected) || (obj[i].checked)) 
		 return true;
	}

return false;
}/*----checkSelected()-----*/


 function telephoneCheck(telephoneNum)
 {
 	var validCharRegExp = /^\+?[\d\- ]+$/;
	var isValid = (validCharRegExp.test(telephoneNum));
	
	return isValid;
 }
function PostalCode(postalCode)
  {
  	var validCharRegExp = /^\d[\d\- ]+$/; 
	var isValid = (validCharRegExp.test(postalCode));
	
	return isValid;
  }
 
 function OnlyAlphabetic(string)
 {
 //	if(string == "" ) return false;
 	var invalidCharRegExp = /[^a-z ]/i;
	var isValid = !(invalidCharRegExp.test(string));	
	return isValid;
 }
 //To validate Numbers only .................................
function isOnlyNumeric(string)
 {
 	if(string == "" ) return false;
 	var invalidCharRegExp = /[^\d]/;
	var isValid = !(invalidCharRegExp.test(string));	
	return isValid;
 }
 
 
function emailCheck(email)
  {
	//alert(email);
	var validCharRegExp = /^\w(\.?[-\w])*@\w(\.?[-\w])*\.([a-z]{3}(\.[a-z]{2})?|[a-z]{2}(\.[a-z]{2})?)$/i;
//var validCharRegExp = /^\w(\.?\w)*@\w(\.?[-\w])*\.([a-z]{3}(\.[a-z]{2})?|[a-z]{2}(\.[a-z]{2})?)$/i;
	

	var isValid = (validCharRegExp.test(email));
	
	
	return isValid;
}/*----- Email-----*/

function nameCheck(name,defaultTxt)
  {
	if(defaultTxt!=name) {
		//alert(email);
		var validCharRegExp = /^[A-Za-z\' -]+$/;
	//var validCharRegExp = /^\w(\.?\w)*@\w(\.?[-\w])*\.([a-z]{3}(\.[a-z]{2})?|[a-z]{2}(\.[a-z]{2})?)$/i;
		

		var isValid = (validCharRegExp.test(name));
		
		
		return isValid;
	} else {
		return false;
	}
}/*----- Email-----*/

function phoneCheck(phone,defaultTxt) {
	if(defaultTxt!=name) {
		//alert(email);
		var validCharRegExp = /^[0-9]+$/;
	//var validCharRegExp = /^\w(\.?\w)*@\w(\.?[-\w])*\.([a-z]{3}(\.[a-z]{2})?|[a-z]{2}(\.[a-z]{2})?)$/i;
		

		var isValid = (validCharRegExp.test(phone));
		
		
		return isValid;
	} else {
		return false;
	}
}

  function openCalendar(element)
  {

  window.open( 'popupCalendar.php?e='+element, 'Calendar', 'top=250,left=250,width=272, height=292' );
  }/*---- openCalendar()-----*/
   
  /*function opencolorwheel(element) 
  {
  window.open('colorwheel.jpg?e='+element, 'select color', 'top=250,left=250,width=260, height=220, scrollbars=false' );
  }*/

function checkDate(fromDate, toDate) 
{
	var from = fromDate.value;
	var to = toDate.value;
	if(from != "" && to != "")
	{
		from = from.substr(0,2)+from.substr(3,1)+from.substr(5,4);
		to = to.substr(0,2)+to.substr(3,1)+to.substr(5,4);
		//alert(" from date "+ from +"\n To date :"+to);
		//alert(Date.parse(from));
		if (from <= to) 
		{
			 return true;
		}
	
	}
	else
		return true;// here if the from date or to date is empty ... no error message should be thrown
	return false;
}/*----CheckDate()-----*/

 function numbersonly(e)
{

	alert(e);
	var unicode=e.charCode? e.charCode : e.keyCode
	//alert(unicode)
	if (unicode!=8 && unicode != 46){ //if the key isn't the backspace key (which we should allow)
	if (unicode<48||unicode>57) //if not a number
		{
			if(unicode==8 || unicode==9 || unicode==44 || unicode==32 ||  unicode==39 || unicode==46 || unicode==45 || unicode==43)//To  enable tab index in firefox and mac.(TAB, Backspace and DEL from the keyboard)
			return true
				else
            return false //disable key press
		}
	}
}

 
 function numbersonlyYears(e)
{

//	alert(e);
	var unicode=e.charCode? e.charCode : e.keyCode
	//alert(unicode)
	if (unicode!=8 && unicode != 46){ //if the key isn't the backspace key (which we should allow)
	if (unicode<48||unicode>57) //if not a number
		{
			if(unicode==8 || unicode==9)//To  enable tab index in firefox and mac.(TAB, Backspace and DEL from the keyboard)
			return true
				else
            return false //disable key press
		}
	}
}
 function numbersonlyProfile(e)
{

var k;
//alert(e.keyCode);
document.all ? k = e.keyCode : k = e.which;
return ((k > 47 && k < 58) || (k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 9 ||  k == 39 || k == 46 || k == 32 || k == 0);
}

function cancel()
{
window.history.back(-1);
}/*---Cancel()---*/

function isOnlyAlphaNumeric(string)
 {
	if(string == "") return false;
 	var invalidCharRegExp = /([a-zA-Z][0-9])|[0-9]/i;
	var isValid = (invalidCharRegExp.test(string));
	if(isValid){
	  var invalidCharRegExp1 = /[\W]/i;
	  var isValid1 = !(invalidCharRegExp1.test(string));
	  return isValid1;
	 } else {
		 return isValid;
	 }
 }

function alphaOnly(e) {
	var k;
	document.all ? k = e.keyCode : k = e.which;
	return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 9 || k == 32 || k == 0 || k == 95);
}

function validate(obj)
{
	obj1 = trim(obj.value)
	if(obj1 == "")
	{		
		alert("Search Text is Empty");
		obj.focus();
		return false;
	}
	else
	return true;
}/*----- Validate Search Text is empty or not-----*/

	function ValidateDate(CtrlSDate,CtrlEDate)   {
		var SDate = CtrlSDate;    	
		var EDate =  CtrlEDate;
		var endDate = new Date(EDate);    	
		var startDate= new Date(SDate);
		 alert(startDate);
		if(SDate != '' && EDate != '' && startDate > endDate)   {	   
			return false;
		}        
	}

	function clearSearch(val){
		
	//	if(document.getElementById('Search').value=='Firstname,lastname...'){
			document.getElementById('Search').value='';
		//}
	}
	function getSearchVal(val){
		
		if(document.getElementById('Search').value==""){
			document.getElementById('Search').value='Search';
		}
	}
	
	function getSearchValue(id,val){
	
		if(document.getElementById('Search').value==""){
			document.getElementById('Search').value=val;
		}
	}
	
	
	
	function clearEmaill(val){
		
		if(document.getElementById(val).value==val){
			document.getElementById(val).value='';
		}
	}
	function getEmailVal(val){
		
		if(document.getElementById(val).value==""){
			document.getElementById(val).value=val;
		}
	}
/* ++++++++++++++++++ Phone Number Validation +++++++++++++++++++++++++ */
	// Declaring required variables
	var digits = "0123456789";
	// non-digit characters which are allowed in phone numbers
	var phoneNumberDelimiters = "()- ";
	// characters which are allowed in international phone numbers
	// (a leading + is OK)
	var validWorldPhoneChars = phoneNumberDelimiters + "+";
	// Minimum no of digits in an international phone no.
	var minDigitsInIPhoneNumber = 10;

	function isInteger(s)
	{   var i;
		for (i = 0; i < s.length; i++)
		{   
			// Check that current character is number.
			var c = s.charAt(i);
			if (((c < "0") || (c > "9"))) return false;
		}
		// All characters are numbers.
		return true;
	}
	function trim(s)
	{   var i;
		var returnString = "";
		// Search through string's characters one by one.
		// If character is not a whitespace, append to returnString.
		for (i = 0; i < s.length; i++)
		{   
			// Check that current character isn't whitespace.
			var c = s.charAt(i);
			if (c != " ") returnString += c;
		}
		return returnString;
	}
	function stripCharsInBag(s, bag)
	{   var i;
		var returnString = "";
		// Search through string's characters one by one.
		// If character is not in bag, append to returnString.
		for (i = 0; i < s.length; i++)
		{   
			// Check that current character isn't whitespace.
			var c = s.charAt(i);
			if (bag.indexOf(c) == -1) returnString += c;
		}
		return returnString;
	}

	function checkInternationalPhone(strPhone){
		var bracket=3
		strPhone=trim(strPhone)
		if(strPhone.indexOf("+")>1) return false
		if(strPhone.indexOf("-")!=-1)bracket=bracket+1
		if(strPhone.indexOf("(")!=-1 && strPhone.indexOf("(")>bracket)return false
		var brchr=strPhone.indexOf("(")
		if(strPhone.indexOf("(")!=-1 && strPhone.charAt(brchr+2)!=")")return false
		if(strPhone.indexOf("(")==-1 && strPhone.indexOf(")")!=-1)return false
		s=stripCharsInBag(strPhone,validWorldPhoneChars);
		return (isInteger(s) && s.length >= minDigitsInIPhoneNumber);
	}
	function popup(url) 
	{
		 var width  = 700;
		 var height = 575;
		 var left   = (screen.width  - width)/2;
		 var top    = (screen.height - height)/2;
		 var params = 'width='+width+', height='+height;
		 params += ', top='+top+', left='+left;
		 params += ', directories=no';
		 params += ', location=no';
		 params += ', menubar=no';
		 params += ', resizable=yes';
		 params += ', scrollbars=yes';
		 params += ', status=no';
		 params += ', toolbar=no';
		 newwin=window.open(url,'windowname5', params);
		 if (window.focus) {newwin.focus()}
		 return false;
	}
	
	
	
	/* Time Display */
	function startclock()
		{
		city ='India';
		offset ='+5.3';			
		// create Date object for current location
		d = new Date();
	   
		// convert to msec
		// add local time zone offset
		// get UTC time in msec
		utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	   
		// create new Date object for different city
		// using supplied offset
		nd = new Date(utc + (3600000*offset));
	   //alert(nd.toLocaleString());
		// return time as a string
		// "The local time in " + city + " is " + nd.toLocaleString();
		var thetime=new Date(nd.toLocaleString());
		
		var nhours=thetime.getHours();
		var nmins=thetime.getMinutes();
		var nsecn=thetime.getSeconds();
		var nday=thetime.getDay();
		var nmonth=thetime.getMonth();
		var ntoday=thetime.getDate();
		var nyear=thetime.getYear();
		var AorP=" ";

		if (nhours>=12)
			AorP="PM";
		else
			AorP="AM";

		if (nhours>=13)
			nhours-=12;

		if (nhours==0)
		   nhours=12;

		if (nsecn<10)
		 nsecn="0"+nsecn;

		if (nmins<10)
		 nmins="0"+nmins;

		if (nday==0)
		  nday="Sunday";
		if (nday==1)
		  nday="Monday";
		if (nday==2)
		  nday="Tuesday";
		if (nday==3)
		  nday="Wednesday";
		if (nday==4)
		  nday="Thursday";
		if (nday==5)
		  nday="Friday";
		if (nday==6)
		  nday="Saturday";

		nmonth+=1;

		if (nyear<=99)
		  nyear= "19"+nyear;

		if ((nyear>99) && (nyear<2000))
		 nyear+=1900;

		document.getElementById('clockspot').innerHTML=nday+", "+ntoday+"-"+nmonth+"-"+nyear+" "+nhours+":"+nmins+":"+nsecn+" "+AorP;

		setTimeout('startclock()',1000);

		} 
	
	function Page(action) {  
		var frmname="";
		// This is the form name for Manage Agent
			var frmname=document.getElementById("Formname").value;
			
		var actions;
		if(action =="Act"){
			actions="Activate";
		}else if(action =="deAct"){
			actions="Deactivate";
		}else{
			actions=action;
		}
		//alert(action);
		var chks = document.getElementsByName('boxchecked[]');
		var hasChecked = false;
		var cancelflag = false;
		for (var i = 0; i < chks.length; i++) {
		
			if (chks[i].checked) {
				
				if (confirm("Are you sure you want to "+actions+"?")) {
					document.getElementById("action").value=action;
					document.forms[frmname].submit();
					hasChecked = true;
					break;
				}else{
					cancelflag=true;
				}
			}
		}

		if ((hasChecked == false) && (cancelflag == false )) {
			
			alert("Please select from the below list to "+actions);
			return false;
		}
	}	

	function actPage(url,action) { 
		
		frmname=document.getElementById('Formname').value;
		var frm = document.myForm;	
		
		var chks = document.getElementsByName('boxchecked[]');
		var hasChecked = false;
		
		for (var i = 0; i < chks.length; i++) {
			if (chks[i].checked) {
				
				if(action == 'edit') {
					var j=i+1;
					id=document.getElementById("boxchecked_"+j).value;
					if((url == 'add-user.php?action=edituser&userType=n') || (url == 'add-user.php?action=edituser&userType=p')){ 
						document.location.href=url+"&userId="+id; 
					}else if(url == 'add-template.php?action=edittemp'){ 
						document.location.href=url+"&tempid="+id; 
					}else if(url == 'add-temp-category.php?action=edittempcat'){ 
						document.location.href=url+"&tempcatid="+id; 
					}else if(url == 'mng-plan.php?action=edit'){ 
						document.location.href=url+"&EditplanId="+id; 
					}else if(url == 'add-sms-plan.php?action=editSms'){ 
						document.location.href=url+"&SmsplanId="+id; 
					}else if(url == 'add-discount.php?action=edit'){ 
						document.location.href=url+"&discountId="+id; 
					}else if(url == 'mng-cycle.php?action=edit'){ 
					var urlorderid=document.getElementById("urlorder").value;
					var urlaction=document.getElementById("urlaction").value;
					var urlusertype=document.getElementById("urluserType").value;
					var urluserid=document.getElementById("urluserId").value;
					
						document.location.href=url+"&cycleid="+id+"&order="+urlorderid+"&userType="+urlusertype+"&userId="+urluserid; //+"&order="+urlorderid+"&action="+urlaction+"&userType="+urlusertype+"&userId="+urluserid
					}else{
						document.location.href=url+"&agentid="+id; 					
					}
				}
				if(action == 'view') {
					var j=i+1;
					id=document.getElementById("boxchecked_"+j).value;
					if(url == 'my-client-details.php?action=viewuser'){
						agtid=document.getElementById('agentidencode').value;
						document.location.href=url+"&userid="+id+"&ag_code="+agtid; 
					}else if((url == 'add-user.php?action=viewuser&userType=n') || (url == 'add-user.php?action=viewuser&userType=p')){
						document.location.href=url+"&userId="+id; 
					}else if((url == 'display-user-status.php?action=statusview&userType=n') || (url == 'display-user-status.php?action=statusview&userType=p')){
						document.location.href=url+"&userId="+id; 
					}else if((url == 'display-user-transaction.php?action=view&userType=n') || (url == 'display-user-transaction.php?action=view&userType=p')){
						document.location.href=url+"&userId="+id; 
					}else if((url == 'audit-trail.php?userType=n') || (url == 'audit-trail.php?userType=p') ){
						document.location.href=url+"&userId="+id; 
					}else if(url == 'add-template.php?action=viewtemp'){
						document.location.href=url+"&tempid="+id; 
					}else if(url == 'mng-support.php?action=view_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-notification.php?action=view_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-anti-spam.php?action=view_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-new-mails.php?action=view_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-rep-mails.php?action=view_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-for-mails.php?action=view_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'add-temp-category.php?action=viewtempcat'){ 
						document.location.href=url+"&tempcatid="+id; 
					}else if(url == 'view-purchase-report.php?action=view'){
						document.location.href=url+"&id="+id; 
					}else if(url == 'view-recent-purch-report.php?action=view'){
						document.location.href=url+"&id="+id; 
					}else if(url == 'view-pending-purch-report.php?action=view'){
						document.location.href=url+"&id="+id; 
					}else if(url == 'sms-purchase-report-view.php?action=view'){
						document.location.href=url+"&smshistId="+id; 
					}else if(url == 'mng-plan.php?action=view'){ 
						document.location.href=url+"&ViewplanId="+id; 
					}else if(url == 'add-sms-plan.php?action=viewSms'){ 
						document.location.href=url+"&SmsplanId="+id; 
					}else if(url == 'client-earnings.php?action=viewuser'){ 
						document.location.href=url+"&ag_code="+id; 
					}else if(url == 'agent-earnings.php?action=viewuser'){ 
						document.location.href=url+"&ag_code="+id; 
					}else if(url == 'add-discount.php?action=view'){ 
						document.location.href=url+"&discountId="+id; 
					}else if(url == 'referral.php?action=viewref'){ 
						document.location.href=url+"&aliseid="+id; 
					}else if(url == 'mng-referral.php?action=view'){ 
						document.location.href=url+"&discountId="+id; 
					}else{
						document.location.href=url+"&agentid="+id; 
					}
				}
				if(action == 'email') { 
					var j=i+1;
					id=document.getElementById("boxchecked_"+j).value;
				
					popitup('send-mail.php?agentid='+id);
					if(url == 'send-mail.php?agentid='+id){ 
						document.location.href=url+"&tempid="+id; 
					}
				}
				if(action == 'notification') { 
					var j=i+1;
					id=document.getElementById("boxchecked_"+j).value;				
					popitup('notification.php?transid='+id);
					if(url == 'notification.php?transid='+id){ 
						document.location.href=url; 
					}
				}				
				if(action == 'ec') {
					var j=i+1;
					id=document.getElementById("boxchecked_"+j).value;
					if(url == 'client.php?action=ec'){ 
					url='client.php?action=Listuser&type=ec';
						document.location.href=url+"&ag_code="+id; 
					}
				}
				if(action == 'uec') {
					var j=i+1;
					id=document.getElementById("boxchecked_"+j).value;
					if(url == 'client.php?action=uec'){ 
					url='client.php?action=Listuser&type=uec';
						document.location.href=url+"&ag_code="+id; 
					}
				}
				if(action == 'cview') {
					var j=i+1;
					id=document.getElementById("boxchecked_"+j).value;
					ag_code=document.getElementById("ag_code").value;
					if(url == 'client-details.php?action=viewuser'){ 
					url='client-details.php?action=viewuser';
						document.location.href=url+"&userid="+id+"&ag_code="+ag_code; 
					}
				}
				if(action == 'reply') {
					var j=i+1;
					
					id=document.getElementById("boxchecked_"+j).value;
					if(url == 'mng-support.php?action=reply_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-notification.php?action=reply_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-anti-spam.php?action=reply_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-new-mails.php?action=reply_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-for-mails.php?action=reply_support'){
						document.location.href=url+"&supportId="+id; 
					}
				}
				if(action == 'emailuser') { 
					var j=i+1;
					id=document.getElementById("boxchecked_"+j).value;				
					popitup('send-mail.php?userid='+id);
					if(url == 'send-mail.php?userid='+id){ 
						document.location.href=url; 
					}
				}
				if(action == 'forward') {
				
					var j=i+1;
					id=document.getElementById("boxchecked_"+j).value;
					
					if(url == 'mng-support.php?action=forward_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-notification.php?action=forward_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-anti-spam.php?action=forward_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-new-mails.php?action=forward_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-rep-mails.php?action=forward_support'){
						document.location.href=url+"&supportId="+id; 
					}else if(url == 'mng-for-mails.php?action=forward_support'){
						document.location.href=url+"&supportId="+id; 
					}
				}
				hasChecked = true;
				break;
			}
		}

		if (hasChecked == false) {
			if(action == 'cview' || action == 'uec' || action == 'ec'){
				alert("Please select from the below list to view");
			}else if(action == 'emailuser'){
				alert("Please select from the below list to send notification");
			}
			/* else if(action == 'uec'){
				alert("Please select from the below list to "+action);
			}
			else if(action == 'ec'){
				alert("Please select from the below list to "+action);
			} */
			else {
				alert("Please select from the below list to "+action);
			}
			return false;
		}
		
	}
	
	function popitup(url) {
		newwindow=window.open(url,'name','height=400,width=400,resizable=no');
		if (window.focus) {newwindow.focus()}
		return false;
	}		
	/* character lenght check eg: username and password lenght Kathir*/
	function check_char_lenght(val,len) {
		if(val.value.length < len) {
			return false;
		} else {
			return true;
		}
	}
	
	function isNumberKey(evt)
	{
	 var charCode = (evt.which) ? evt.which : event.keyCode
	 if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;

	 return true;
	}
	
/****************Allow Only alpha numeric by kayal on 16-dec-2011 ********************/
function letternumber(e)
{
var key;
var keychar;

if (window.event)
   key = window.event.keyCode;
else if (e)
   key = e.which;
else
   return true;
keychar = String.fromCharCode(key);
keychar = keychar.toLowerCase();

// control keys
if ((key==null) || (key==0) || (key==8) || 
    (key==9) || (key==13) || (key==27) )
   return true;

// alphas and numbers
else if ((("abcdefghijklmnopqrstuvwxyz0123456789").indexOf(keychar) > -1))
   return true;
else
   return false;
}
/*************** Alpha numeric check End *****************************************/


function OnFocusName1(idValOut,ValOut,typedVal) {
	//alert(idValOut+','+ValOut+','+typedVal);
	if(typedVal==ValOut) {
		document.getElementById(idValOut).value='';
	} else {
		document.getElementById(idValOut).value=typedVal;
	}
	
}

function OnBlurName1(idValOut,ValOut,typedVal) {
	//alert(idValOut+','+ValOut+','+typedVal);
	if(typedVal==ValOut || typedVal=="") {
		document.getElementById(idValOut).value=ValOut;
	} else {
		document.getElementById(idValOut).value=typedVal;
	}
}