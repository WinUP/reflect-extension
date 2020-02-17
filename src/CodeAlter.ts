(function () {
    Reflect.CodeAlter.copyProperties = function (from: Object, to: Object, exclude: string[] = Reflect.Excludes): void {
        Object.getOwnPropertyNames(from).filter(name => !exclude.includes(name)).forEach(name => {
            (to as any)[name] = (from as any)[name];
        });
    };

    Reflect.CodeAlter.appendMethod = function (from: { [key: string]: any }, to: { [key: string]: any }, fromName: string, toName?: string,
        injectArgIndex?: number, injectMethodIndex?: number): void {
        const destinationName = toName ?? fromName;
        const originalMethod = to[destinationName] || function () { };
        const extendedMethod = from[fromName] || function () { };
        if (injectArgIndex != null && injectMethodIndex != null && injectArgIndex === injectMethodIndex) {
            throw new SyntaxError('Unable to extend method: inject argument index must not same as inject method index');
        }
        if (injectArgIndex != null || injectMethodIndex != null) {
            to[destinationName] = function () {
                const result = Reflect.apply(originalMethod, this, arguments);
                return Reflect.apply(extendedMethod, this, createArguments(arguments, originalMethod, result, injectArgIndex, injectMethodIndex));
            };
        } else {
            to[destinationName] = function () {
                Reflect.apply(originalMethod, this, arguments);
                return Reflect.apply(extendedMethod, this, arguments);
            };
        }
    };

    /**
     * Create argument list for mixed method
     * @param source Source arguments
     * @param method Source method
     * @param result Source method's return data
     * @param injectArgIndex Parameter index that source method's return data should be injected to in destination method
     * @param injectMethodIndex Parameter index that source method itself should be injected to in destination method
     */
    function createArguments(source: IArguments, method: Function, result: any, injectArgIndex: number = -1, injectMethodIndex: number = -1): any[] {
        if (injectArgIndex === injectMethodIndex) {
            throw new SyntaxError('Unable to extend method: inject argument index must not same as inject method index');
        }
        const args: any[] = [];
        for (let i = -1, length = source.length; ++i < length;) {
            args.push(source[i]);
        }
        if (injectArgIndex < injectMethodIndex) {
            injectArgIndex > -1 && args.splice(injectArgIndex, 0, result);
            injectMethodIndex > -1 && args.splice(injectMethodIndex, 0, method);
        } else {
            injectMethodIndex > -1 && args.splice(injectMethodIndex, 0, method);
            injectArgIndex > -1 && args.splice(injectArgIndex, 0, result);
        }
        return args;
    }
})();
