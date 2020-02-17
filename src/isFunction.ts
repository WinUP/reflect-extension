(function () {
    Function.isFunction = function (source: any): source is Function {
        const value = Reflect.apply(Object.prototype.toString, source, []);
        return source != null && (typeof source === 'object' || typeof source === 'function') &&
            (value === '[object Function]' || value === '[object AsyncFunction]' || value === '[object GeneratorFunction]' || value === '[object Proxy]');
    };
})();
