// simple jquery
var Lib = (function () {
    var El = function (dom) {
        this.dom = dom;
    };
    El.prototype.kid = function () {
        var doms = this.dom.children;
        if (doms.length === 0) return doms;
        else if (doms.length === 1) return new El(doms[0]);
        else {
            var arr = [];
            for (var i = 0; i < doms.length; i++) {
                arr.push(new El(doms[i]));
            }
            return arr;
        }
    };
    El.prototype.one = function (selector) {
        return new El(this.dom.querySelector(selector));
    };
    El.prototype.all = function (selector) {
        var arr = [];
        var doms = document.querySelectorAll(selector);
        for (var i = 0; i < doms.length; i++) {
            arr.push(new El(doms[i]));
        }
        return arr;
    };
    return new El(document);
})();