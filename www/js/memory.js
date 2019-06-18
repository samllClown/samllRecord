$(function(){
	init();
	getUserObj();
})


/**
 * 获取用户对象数据，若无则创建用户对象并存入数据
 */
function getUserObj(){
	var user = window.localStorage.getItem("userObj");
	user = user ? JSON.parse(user):"";
	existsUser(user);
}

/**
 * 判断数据库中是否有用户对象数据 
 */
function existsUser(user){
	if(user){
		//若缓存中有数据时 直接获取
		var userObj = user;
	}else{
		existsServerUser();
	}
}

/**
 * 判断数据库中是否有对象
 */
function existsServerUser(){
	
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
	document.addEventListener('deviceready',onDeviceReady, false);
	
	
}

/**
 * cordova加载完成
 */
function onDeviceReady(){
	var userObj = {
		userName:"name",
		userPassword:"password",
		userPhone:"phone",
		userUuid:device.uuid+device.cordova+device.model+device.manufacturer
	};
	
	localStorage.setItem("userObj",JSON.stringify(userObj));
	
	
	$.ajax({
		url:ajaxUrl.getUserCKUrl,
		async:true,
		data:userObj,
		dataType:"JSON",
		success:function(data){
			if(data.result == "SUCCESS"){
				console.log("用户信息添加远程数据库成功")
			}else{
				console.log("用户信息添加远程数据库失败")
				console.log("失败原因"+data.log);
			}
		},
		error:function(){
			console.log("添加远程数据库失败")
		}
	});

}

/*
 * 页面初始话(画页面，添加点击事件)
 */
function init(){
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	document.getElementById("btn1").addEventListener("tap",function(){
		mui('.mui-off-canvas-wrap').offCanvas().toggle();
	});
	document.getElementById("btn2").addEventListener("tap",function(){
		mui.openWindow({
			url:"dailyRecord.html",
			
		})
	});
	document.getElementById("btnLogin").addEventListener("tap",function(){
		mui.openWindow({
			url:"login.html",
			extras:{
				name:"tom"
			}
		})
	});
}


