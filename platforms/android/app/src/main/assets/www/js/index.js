var app = {
    initialize: function() {
       // 等待加载cordova
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    // cordova加载完成
    onDeviceReady: function() {
      this.deviceVersion();
    },
    deviceVersion: function() {
//    var html = "<br/> 设备上的cordova版本：" + device.cordova +
//             "<br/> 设备名称：" + device.model +
//             "<br/> 设备平台系统：" + device.platform +
//             "<br/> 设备唯一标识符" + device.uuid +
//             "<br/> 设备平台操作系统版本号：" + device.version +
//             "<br/> 设备平台制造商：" + device.manufacturer ;
		
      	alert("cordova加载完成1");
		var deviceObj=window.localStorage.getItem("device");
		deviceObj = deviceObj ? JSON.parse(deviceObj):"";
		
		if(!deviceObj){
			var deviceObj = {
				cordova:device.cordova,
				model:device.model,
				uuid:device.uuid,
				platform:device.platform,
				version:device.version,
				manufacturer:device.manufacturer
			}
			window.localStorage.setItem("device",JSON.stringify(deviceObj));
		}

    }
};

