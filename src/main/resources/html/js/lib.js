// simple jquery
(function () {
    let El = function (dom) {
        this.dom = dom;
    };
    El.of = function () {
        if (arguments.length === 0) return new El(null);
        else if (arguments.length === 1) return new El(arguments[0]);
        else return new El(Array.from(arguments));
    };
})();