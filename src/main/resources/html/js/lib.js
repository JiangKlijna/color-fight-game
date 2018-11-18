// simple jquery
var Lib = (function () {
    document.style = {};
    document.classList = [];
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
    El.prototype.eq = function (el) {
        return el !== null && el.constructor === El && this.dom() === el.dom();
    };
    El.prototype.copy = function (v) {
        return new El(v ? v : this.dom());
    };
    El.prototype.css = function (k, v) {
        if (k === undefined && v === undefined) {
            return this.dom().style;
        } else {
            this.dom().style[k] = v;
            return this;
        }
    };
    El.prototype.ac = function (cls) {
        this.dom().classList.add(cls);
        return this;
    };
    El.prototype.rc = function (cls) {
        this.dom().classList.remove(cls);
        return this;
    };
    El.prototype.html = function (v) {
        if (v === undefined) {
            return this.dom().innerHTML;
        } else {
            this.dom().innerHTML = v;
        }
        return this;
    };
    El.prototype.text = function (v) {
        if (v === undefined) {
            return this.dom().innerText;
        } else {
            this.dom().innerText = v;
        }
        return this;
    };
    El.prototype.val = function (v) {
        if (v === undefined) {
            return this.dom().value;
        } else {
            this.dom().value = v;
        }
        return this;
    };
    return new El(document);
})();