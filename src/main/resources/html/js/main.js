var app = (function () {
    var self = {};
    self.el = Lib.one("app");
    self.init = function () {
        self.el.html("");
    };
    return self;
})();

app.init();