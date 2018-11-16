// simple jquery
var Lib = (function () {
    let self = {};
    let El = function (dom) {
        this.dom = dom;
        this.isArray = dom instanceof Array
    };
    self.of = function () {
        if (arguments.length === 0) return new El(null);
        else if (arguments.length === 1) return new El(arguments[0]);
        else return new El(Array.from(arguments));
    };
    return self;
})();