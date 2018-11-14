var app = (function () {
    var self = {};
    self.el = document.getElementById("app");
    self.init = function () {
        self.el.innerHTML = "";
    };
    return self;
})();

app.init();