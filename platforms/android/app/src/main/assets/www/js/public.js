var basePublicUrl = "http://211.99.9.81:10180/esCloudApp/app/"; //公共的路径 陆
//var basePublicUrl = "http://192.168.100.56:8080/esCloudApp/app/";
//var basePublicUrl = "http://192.168.100.59:8080/jeesite/app/";
var getUserInfo = localStorage.getItem("userInfo");//从缓存中获取数据
//var Autologon = localStorage.getItem("AutologonBool");
if(getUserInfo){
	getUserInfo = JSON.parse(getUserInfo);//字符串转成对象
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
