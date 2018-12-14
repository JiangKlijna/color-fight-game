// connect for game server
var Connect = function () {
    var skt = null;
    var self = this;
    var _onMessage = function (e) {
        if (self.onMessage != null) {
            self.onMessage(JSON.parse(e));
        }
    };
    this.onOpen = function (e) {
        console.log("websocket onopen", e);
    };
    this.onClose = function (e) {
        console.log("websocket onclose", e);
    };
    this.onMessage = function (e) {
        console.log("websocket onMessage", e);
    };
    this.send = function (obj) {
        if (skt != null) {
            skt.send(JSON.stringify(obj))
        }
    };
    this.init = function () {
        skt = new WebSocket("ws://localhost:8080/");
        skt.onopen = self.onOpen;
        skt.onclose = self.onClose;
        skt.onmessage = _onMessage;
    };
};