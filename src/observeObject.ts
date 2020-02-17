(function () {
    interface IExtendedOptions {
        current: any;
        path: string[];
        observed: string[];
    }

    function normalizeName(name: string): string {
        if (name.startsWith('[')) {
            return `$${name}`;
        } else if (!name.startsWith('$')) {
            return `$.${name}`;
        } else {
            return name;
        }
    }

    /**
     * Create value observer on target object
     * @param root Target object
     * @param options Observer create options
     */
    Reflect.observeObject = function <T extends Object>(root: T, options: Reflect.IObserveOptions): T {
        return createObserver(root, { ...options, current: root, path: ['$'], observed: [] });
    };

    function getPathObserveType(path: string, options: Reflect.IObserveOptions & IExtendedOptions): Reflect.PathObserveType {
        const checkers = options.pathType || [];
        for (let i = -1, length = checkers.length, checker = checkers[0]; ++i < length; checker = checkers[i + 1]) {
            if (Function.isFunction(checker)) {
                const result = checker(path, options);
                if (result) return result;
            } else if (path in checker) {
                return checker[path];
            }
        }
        return Reflect.PathObserveType.Shallow;
    }

    function createObserver<T extends Object>(root: T, options: Reflect.IObserveOptions & IExtendedOptions): T {
        const path = normalizeName(options.path.join(''));
        if (options.observed.includes(path)) return options.current;
        const checkResult = getPathObserveType(path, options);
        if (checkResult === Reflect.PathObserveType.Exclude) return options.current;
        options.observed.push(path);
        if (options.current instanceof Object && checkResult === Reflect.PathObserveType.Deep) {
            if (Array.isArray(options.current)) {
                for (let i = -1, length = options.current.length; ++i < length;) {
                    if (options.current[i] instanceof Object) {
                        const currentPath = [...options.path];
                        currentPath.push(`[${i}]`);
                        options.current[i] = createObserver(root, { ...options, current: options.current[i], path: currentPath });
                    }
                }
            } else {
                for (let i = -1, keys = Object.getOwnPropertyNames(options.current), length = keys.length, key = keys[0]; ++i < length; key = keys[i + 1]) {
                    const value = options.current[key];
                    if (value instanceof Object && !Function.isFunction(value)) {
                        const currentPath = [...options.path];
                        currentPath.push(`.${key}`);
                        options.current[key] = createObserver(root, { ...options, current: value, path: currentPath });
                    }
                }
            }
        }
        return new Proxy<T>(options.current, {
            set: (target, name, value): boolean => {
                const useSetter = options.useSetter == null || options.useSetter(target, name, value);
                const jsonPath: string | undefined = (options.preSetter || options.postSetter) && useSetter
                    ? Array.isArray(target) ? `${path}[${name.toString()}]` : `${path}.${name.toString()}`
                    : undefined;
                if (options.preSetter && useSetter) {
                    value = options.preSetter(root, target, name, jsonPath!, value, options);
                    !options.skipDefaultSetter && Reflect.set(target, name, value);
                } else {
                    !options.skipDefaultSetter && Reflect.set(target, name, value);
                }
                if (value instanceof Object && getPathObserveType(path, options) === Reflect.PathObserveType.Deep) {
                    const currentPath = [...options.path];
                    currentPath.push(Array.isArray(target) ? `[${name.toString()}]` : `.${name.toString()}`);
                    Reflect.set(target, name, createObserver(root, { ...options, current: value, path: currentPath }));
                }
                if (options.postSetter && useSetter) {
                    options.postSetter(root, target, name, jsonPath!, value, options);
                }
                return true;
            },
            get: (target, name): any => {
                const useGetter = options.useGetter == null || options.useGetter(target, name);
                if (options.getter && useGetter) {
                    const jsonPath = Array.isArray(target) ? `${path}[${name.toString()}]` : `${path}.${name.toString()}`;
                    return options.getter(root, target, name, jsonPath, options);
                } else {
                    return Reflect.get(target, name);
                }
            }
        });
    }
})();
