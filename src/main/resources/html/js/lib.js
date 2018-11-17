// simple jquery
var Lib = (function () {
    var El = function (dom) {
        this.dom = dom;
    };
    El.of = function (doms) {
        var arr = [];
        for (var i = 0; i < doms.length; i++) {
            arr.push(new El(doms[i]));
        }
        return arr;
    };
    El.prototype.kid = function () {
        var doms = this.dom.children;
        return El.of(doms);
    };
    El.prototype.one = function (selector) {
        return new El(this.dom.querySelector(selector));
    };
    El.prototype.all = function (selector) {
        var doms = document.querySelectorAll(selector);
        return El.of(doms);
    };
    return new El(document);
})();