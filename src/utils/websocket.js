/** webSocket 请求封装 */
// 心跳机制
const heartBeat = {
    timeout: 10 * 1000,//心跳间隔
    timeoutObj: null,
    // serverTimeoutObj: null,
    reset: function (ws) {
        clearTimeout(this.timeoutObj)
        // clearTimeout(this.serverTimeoutObj)
        this.start(ws)
    },
    start: function (ws) {
        // console.log('start')
        // var self = this
        this.timeoutObj && clearInterval(this.timeoutObj)
        // this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
        this.timeoutObj = setInterval(function () {
            // 这里发送一个心跳，后端收到后，返回一个心跳消息，
            if(ws.readyState === 1){
                ws.send('heart')
            }
            // self.serverTimeoutObj = setTimeout(function () {
            //     ws.onclose()
            // }, self.timeout)
        }, this.timeout)
    }
}

function InitWebSocket(wsUrl) {
    this.wsUrl = wsUrl// webSocket的请求地址
    this.lockReconnect = false // 避免重连的机制
    this.HeartCheck = heartBeat

    this.try = null// 尝试重连
    this.heartBeatClock = null// 心跳连接的setTimeout函数
    var _this = this

    this.initWebSocket = function () { // 初始化webSockt连接
        _this.ws = new WebSocket(_this.wsUrl)
        _this.ws.onopen = function () {
            _this.ws.send('WebSocket connection successful')
            _this.HeartCheck.start(_this.ws)
            _this.onopen()//调用用户自定义的数据处理方式
        }
        _this.ws.onmessage = function (e) {
            const redata = JSON.parse(e.data)
            // 一旦收到数据不管是甚么数据，说明活着
            _this.onmessage(redata)//调用用户自定义的数据处理方式
            // _this.HeartCheck.reset(_this.ws)// 发送心跳信息
        }
        _this.ws.onclose = function (e) {
            console.log('WebSocket Connection closed')
            // _this.onclose()//调用用户自定义的数据处理方式
        }
        _this.ws.onerror = function () {
            console.log('WebSocket Connection error')
            clearTimeout(_this.try)
            _this.try = setTimeout(() => {
                _this.reconnectWebSocket()
            }, 5000)
        }
    }
    // 重连机制
    this.reconnectWebSocket = function () {
        console.log('Trying to reconnect')
        if (_this.lockReconnect) {
            return
        }
        _this.lockReconnect = true
        // 没连接上会一直重连，设置延迟避免请求过多
        _this.heartBeatClock && clearTimeout(this.heartBeatClock)
        _this.heartBeatClock = setTimeout(() => {
            _this.initWebSocket()
            _this.lockReconnect = false
        }, 5000)
    }
    this.initWebSocket()
    return this
}

// 便于外部重新定义方法处理数据
InitWebSocket.prototype.onopen = function () { }
InitWebSocket.prototype.onmessage = function () { }
InitWebSocket.prototype.onclose = function () { 
    this.ws.close() //关闭连接
 }
InitWebSocket.prototype.send = function (data) {
    this.ws.send(data)
}

export default InitWebSocket