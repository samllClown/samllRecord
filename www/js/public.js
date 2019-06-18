var basePublicUrl = "http://192.168.1.101:8088";//服务器地址端口
var basePublicUserUrl = basePublicUrl+"/PhoneUser";//用户操作接口
var ajaxUrl = {
	getUserLoginUrl:basePublicUserUrl+"/phoneLogin",
	getUserCKUrl:basePublicUserUrl+"/phoneUserCK"
}

function networkRequestErr(data, textStatus) {
	alert("!!!!")
	mui.toast('网络访问错误,请检查网络连接');
}


function GetRequest() { //获取URL中的参数
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if(url.indexOf("=") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

var isCode = localStorage.getItem("isCode"); //是否扫码 true是，false否
if(!isCode){
	isCode = false
}
var isType = localStorage.getItem("isType"); //是否充电 true是，false 否
if(!isType){
	isType = false;
	localStorage.setItem("isType", isType);
}
