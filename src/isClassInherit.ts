(function () {
    const objectProto = Reflect.getPrototypeOf(Object);

    Reflect.isClassInherit = function (source: Object, base: any): boolean {
        let item: Object = Function.isFunction(source) ? source : source.constructor;
        base = Function.isFunction(base) ? base : base.constructor;
        do {
            if (item === base) return true;
            item = Reflect.getPrototypeOf(item);
        } while (item !== Object.prototype && item !== objectProto);
        return false;
    };
})();
