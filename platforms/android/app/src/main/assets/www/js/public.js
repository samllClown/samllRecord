var basePublicUrl = "http://192.168.42.218:8088";//服务器地址端口
var basePublicUserUrl = basePublicUrl+"/PhoneUser";//用户操作接口
var basePublicDailyUrl = basePublicUrl+"/PhoneDaily";//记录安排操作接口

var ajaxUrl = {
	getUserLoginUrl:basePublicUserUrl+"/phoneLogin",
	getUserCKUrl:basePublicUserUrl+"/phoneUserCK",
	getDailyTest:basePublicDailyUrl+"/phoneDailyTest"
}

function networkRequestErr(data, textStatus) {
	alert("!!!!")
	mui.toast('网络访问错误,请检查网络连接');
}

function testAlert(str){
	var blo = false;
	if(blo){
		alert(str);
	}
	
}


function GetRequest() { //获取URL中的参数s
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
/**************************************时间格式化处理************************************/
function dateFtt(fmt,date)   
{ //author: meizz   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

//设置单一事件对象
function DailyOne(workId,workTheme,workDetail,workTime){
	this.workId = workId;
	this.workTheme = workTheme;
	this.workDetail = workDetail;
	this.workTime = workTime;
}

//设置事件对象
function DailyRecord(dailyList,time,uuid){
	this.dailyList = dailyList;
	this.time = time;
	this.uuid = uuid;
};

//设置全部事件对象合计
 function DailyAllList(dailyRecordList,uuid){
 	this.dailyRecordList = dailyRecordList;
 	this.uuid = uuid;
 }
 
 //设置用户对象
 function UserObj(userName,userPassword,userPhone,userUuid){
 	this.userName = userName;
 	this.userPassword = userPassword;
 	this.userPhone = userPassword;
 	this.userUuid = userUuid;
 }



/**
 * 获取用户对象数据，若无则创建用户对象并存入数据
 */
function getUserObj(){
	var user = window.localStorage.getItem("user");
	user = user ? JSON.parse(user):"";
	if(user){
		//若缓存中有数据时 直接获取
		testAlert("当前有用户对象："+JSON.stringify(user));
	}else{
		testAlert("当期无对象");
	//	$.ajax({
	//		url:"",
	//		data:"",
	//		
	//	})
		
		//服务器中是否有数据{1，有数据从服务器中获取，2无数据，创建数据后添加缓存中添加服务器中}
	
		/**
		 * 2,创建数据后添加缓存中添加服务器中
		 * 需要先获取硬件设备信息，获取后再创建对象故放在onDeviceReady方法中
		 */
		document.addEventListener('deviceready',function(){
			
			var userObj = new UserObj("name","password","phone",device.uuid+device.cordova+device.model+device.manufacturer);
			testAlert("创建完成");
			window.localStorage.setItem("user",JSON.stringify(userObj));
//			$.ajax({
//				url:ajaxUrl.getUserCKUrl,
//				async:true,
//				data:userObj,
//				dataType:"JSON",
//				success:function(data){
//					if(data.result == "SUCCESS"){
//						console.log("用户信息添加远程数据库成功")
//					}else{
//						console.log("用户信息添加远程数据库失败")
//						console.log("失败原因"+data.log);
//					}
//				},
//				error:function(){
//					console.log("添加远程数据库失败")
//				}
//			});
		}, false);
	}
}

var formatJson = function (jsonStr) {
    var str = jsonStr.replace(/,/g,",<br/>");
    
    return str;
};
//获取用户对象
getUserObj();