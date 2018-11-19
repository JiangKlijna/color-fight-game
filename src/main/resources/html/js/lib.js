// simple jquery
var Lib = (function () {
    var html = document.getElementsByTagName("html")[0];
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
    El.prototype.parent = function () {
        var doms = this.dom().parentElement;
        return El.of(doms);
    };
    El.prototype.$ = function (selector) {
        var doms = this.dom().querySelectorAll(selector);
        if (doms.length === 1) return new El(doms[0]);
        else El.of(doms);
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
        return new El(html);
    };
    El.prototype.eq = function (el) {
        return el !== null && el.constructor === El && this.dom() === el.dom();
    };
    El.prototype.next = function () {
        return this.dom().nextElementSibling;
    };
    El.prototype.prev = function () {
        return this.dom().previousElementSibling;
    };
    El.prototype.copy = function (v) {
        return new El(v ? v : this.dom());
    };
    El.prototype.css = function (k, v) {
        if (k === undefined) {
            return this.dom().style;
        } else if (v === undefined) {
            return this.dom().style[k];
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
    El.prototype.val = function(v) {
        var dom = this.dom();
        if (v === undefined) {
            return dom.getAttribute("value") || dom.value;
        } else {
            dom.setAttribute("value", v);
            dom.value = v;
        }
        return this;
    };
    El.prototype.field = function (k, v) {
        if (k === undefined) {
            return this;
        } else if (v === undefined) {
            return this.dom()[k];
        } else {
            this.dom()[k] = v;
            return this;
        }
    };
    El.prototype.attr = function (k, v) {
        if (k === undefined) {
            return this;
        } else if (v === undefined) {
            return this.dom().getAttribute(k);
        } else {
            this.dom().setAttribute(k, v);
            return this;
        }
    };
    El.prototype.data = function (k, v) {
        var dom = this.dom();
        if (k === undefined) {
            return this;
        } else if (v === undefined) {
            return dom.dataset ? dom.dataset[k] : dom.getAttribute("data-" + k);
        } else {
            dom.dataset ? dom.dataset[k] = v : dom.setAttribute("data-" + k, v);
            return this;
        }
    };
    return new El(html);
})();