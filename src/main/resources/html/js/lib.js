// simple jquery
var Lib = (function () {
    var El = function (dom) {
        var _dom = dom;
        this.dom = function () {
            return _dom;
        };
        this.rewrite = function (dom) {
            _dom = dom;
        }
    };
    El.of = function (doms) {
        var arr = [];
        for (var i = 0; i < doms.length; i++) {
            arr.push(new El(doms[i]));
        }
        return arr;
    };
    El.prototype.kid = function () {
        var doms = this.dom().children;
        return El.of(doms);
    };
    El.prototype.one = function (selector) {
        return new El(this.dom().querySelector(selector));
    };
    El.prototype.all = function (selector) {
        var doms = this.dom().querySelectorAll(selector);
        return El.of(doms);
    };
    El.prototype.clone = function () {
        return new El(this.dom());
    };
    El.prototype.root = function () {
        return new El(document);
    };
    EL.prototype.equals = function (el) {
        return el !== null && el.constructor === El && this.dom() === el.dom();
    };
    return new El(document);
})();