// connect for game server
var Connect = function () {
    var skt = null;
    this.init = function () {
        skt = new WebSocket("ws://localhost:8080/");
        skt.onopen = self.onOpen;
        skt.onclose = self.onClose;
        skt.onmessage = self.onMessage;
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
};