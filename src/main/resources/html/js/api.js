// api for game server
var api = (function () {
    var self = {};
    var skt = null;
    self.init = function () {
        skt = new WebSocket("ws://localhost:8080/");
        skt.onopen = self.onOpen;
        skt.onclose = self.onClose;
        skt.onmessage = self.onMessage;
    };
    self.onOpen = function (e) {
        console.log("websocket onopen", e);
    };
    self.onClose = function (e) {
        console.log("websocket onclose", e);
    };
    self.onMessage = function (e) {
        console.log("websocket onMessage", e);
    };
    self.init();
    return self;
})();