(function () {
    const objectProto = Reflect.getPrototypeOf(Object);
    const forEachDefaultEndCondition = (item: Object) => item !== Object.prototype && item !== objectProto;

    Reflect.forEachPrototype = function (root: Object, callbackfn: (item: Object) => void, thisArg?: any,
        endCondition: (item: Object) => boolean = forEachDefaultEndCondition): void {
        let item = Reflect.getPrototypeOf(root);
        while (endCondition(item)) {
            Reflect.apply(callbackfn, thisArg, [item]);
            item = Reflect.getPrototypeOf(item);
        }
    };
})();
