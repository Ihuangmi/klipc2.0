export default {
	/**
	 * 
	 * @param {String} url wwbsocket地址
	 * @param {*} th //vue的this
	 */
	async wsOpen(url, _this) {
		let ws = new WebSocket(url);
		ws.onopen = function (evt) {
			// console.log(evt)
			//心跳监测定时器，定义为对象，是为了防止一个组件多个定时器，调用wsOpen导致定时器被覆盖，就始终有定时器未被正常关闭
			_this.testWeb = _this.testWeb || {}
			//每隔10秒钟发送一次心跳，避免websocket连接因超时而自动断开 
			_this.testWeb[url] = setInterval(function () {
				/**
				*	readyState
				*	0: connecting	正在连接
				*	1：open		连接开 启
				*	2：closing		正在关闭
				*	3：closed		关闭成功，触发onclose
				*/
				//虽然心跳会在触发close/error时被关闭，
				//但是其关闭时间并不短暂也就是其在关闭中定时器不会调用onclose关闭心跳
				//readyState=2持续发送心跳数据会导致控制台报错，所以我加了判断
				ws.readyState === 1 ? ws.send('ping') : clearInterval(_this.testWeb[url]);
			}, 10 * 1000);
		};
		ws.onerror = error => {
			clearInterval(_this.testWeb[url]);
			console.log('websoket错误了',error); 
			if (_this.reconnect) {	//非正常关闭重连
				let timeouts = setTimeout(() => {
					_this.getData();//ws关闭后的回调函数
					clearTimeout(timeouts)
				}, 60 * 1000)
			}
		};
		ws.onclose = () => {
			clearInterval(_this.testWeb[url]);
			_this.testWeb = {};
			console.log('websoket关闭了');
			if (_this.reconnect && ws.readyState == 3) {	//非正常关闭重连
				let timeouts = setTimeout(() => {
					_this.getData();//ws关闭后的回调函数
					clearTimeout(timeouts)
				}, 10 * 1000)
			}
		};
		return ws;
	},
}