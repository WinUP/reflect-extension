(function () {
    Reflect.getConstructorOf = function <T>(target: any): ClassType<T> {
        return Function.isFunction(target) ? target : target.constructor;
    };
})();
