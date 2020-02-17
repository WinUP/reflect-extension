declare type ClassType<T = any> = new (...args: any[]) => T;

declare interface FunctionConstructor {
    /**
     * Indicate if given input is function
     * @param source Target that use for test
     */
    isFunction(source: any): source is Function;
}

declare namespace Reflect {
    /**
     * Getter function for object observer
     * @param root Root object
     * @param target Target object
     * @param name Wanted item's name or index in target object
     * @param path JSONPath of wanted item starts from root object
     * @param options Observe options
     */
    type ObserverGetter = (root: any, target: any, name: string | number | symbol, path: string, options: IObserveOptions) => any;

    /**
     * Pre setter function for object observer
     * @description If setter returns any value other than `undefined`, returned value will be used as new value
     * @param root Root object
     * @param target Target object
     * @param name Wanted item's name or index in target object
     * @param path JSONPath of wanted item starts from root object
     * @param value Wanted item's new value
     * @param options Observe options
     * @returns Value that will assign to wanted item (when `skipDefaultSetter` is not true)
     */
    type ObserverSetter = (root: any, target: any, name: string | number | symbol, path: string, value: any, options: IObserveOptions) => any;

    /**
     * Post setter function for object observer
     * @param root Root object
     * @param target Target object
     * @param name Wanted item's name or index in target object
     * @param path JSONPath of wanted item starts from root object
     * @param value Wanted item's new value
     * @param options Observe options
     */
    type ObserverPostSetter = (root: any, target: any, name: string | number | symbol, path: string, value: any, options: IObserveOptions) => void;

    /**
     * Checker to generate path observe type
     * @param path JSONPath of wanted item starts from root object
     * @param options Observe options
     * @returns if return `undefined` or `null`, observer will use `PathObserveType.Shallow` instead
     */
    type ObserverPathTypeChecker =
        ((path: string, options: IObserveOptions & { readonly current: any, path: ReadonlyArray<string>, observed: ReadonlyArray<string> }) => PathObserveType | undefined) |
        { [key: string]: PathObserveType };

    /**
     * Object observer create options
     */
    interface IObserveOptions {
        /**
         * Value getter
         */
        getter?: ObserverGetter;
        /**
         * Value pre-setter
         */
        preSetter?: ObserverSetter;
        /**
         * Value post-setter
         */
        postSetter?: ObserverPostSetter;
        /**
         * Indicate if getter should be applied
         */
        useSetter?: (target: any, name: string | number | symbol, value: any) => boolean;
        /**
         * Indicate if setter should be applied
         */
        useGetter?: (target: any, name: string | number | symbol) => boolean;
        /**
         * Checker to generate path observe type
         */
        pathType?: ObserverPathTypeChecker[];
        /**
         * Indicate if default setter (`Reflect.set`) should be skipped
         */
        skipDefaultSetter?: boolean;
    }

    /**
     * Basic autowire parameters
     */
    interface IInjectorInformation {
        /**
         * Method name (empty when define for class constructor)
         */
        name?: string;
        /**
         * Indicate if this is static method
         */
        static: boolean;
        /**
         * Extra parameters if have
         */
        extra: { [key: string]: any };
    }

    /**
     * Path observation type for special paths
     */
    enum PathObserveType {
        /**
         * Skip observe this path
         */
        Exclude,
        /**
         * Deep observe this path recursively
         */
        Deep,
        /**
         * Shallow observe this path
         */
        Shallow
    }

    /**
     * Name for injector collection in `defineMetadata`
     */
    let InjectorMetadataName: string;

    /**
     * Default member list that excludes when scan or copy object's own properties.
     */
    let Excludes: string[];

    /**
     * Create metadata for class members or static class members
     * @param target Class constructor (for static member) or instance/prototype (for non-static member)
     * @param name Property key that metadata defines for, or `undefined` for class itself
     */
    function defineClassMetadata(target: any, name?: string): IInjectorInformation;

    /**
     * Performs the specified action for each element in prototype chain of root item.
     * @param callbackfn  A function that accepts one argument. forEach calls the callbackfn function one time for each element in the prototype chain starts from root item.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     * @param endCondition Condition that check if forEach should continue to next item (default check if item is neither `prototype` or `__proto__` of `Object`)
     */
    function forEachPrototype(root: Object, callbackfn: (item: Object) => void, thisArg?: any, endCondition?: (item: Object) => boolean): void;

    /**
     * Get constructor of given target
     * @param target Target object
     */
    function getConstructorOf<T>(target: any): ClassType<T>;

    /**
     * Indicate if source item's constructor (or source item if it is function) is inherit from
     * base item's constructor (or base item if it is function).
     * @param source Source item
     * @param base Base item
     */
    function isClassInherit(source: Object, base: any): boolean;

    /**
     * Create value observer on target object
     * @param root Target object
     * @param options Observer create options
     */
    function observeObject<T extends Object>(root: T, options: IObserveOptions): T;

    /**
     * Pick metadata from class members or static class members
     * @param target Class constructor (for static member) or instance/prototype (for non-static member)
     * @param name Property key that metadata defines for, or `undefined` for class itself
     */
    function getClassMetadata(target: any, name?: string): IInjectorInformation | undefined;

    /**
     * Pick all class metadata defines in given target
     * @param target Class constructor (for static member) or instance/prototype (for non-static member)
     */
    function getClassMetadataList(target: any): IInjectorInformation[] | undefined;

    namespace CodeAlter {
        /**
         * Copy own properties from object to another object
         * @param from Source object
         * @param to Destination object
         * @param exclude List of exclude property names
         */
        function copyProperties(from: Object, to: Object, exclude?: string[]): void;

        /**
         * Mix two methods to onw
         * @param from Source object
         * @param to Destination object
         * @param fromName Source method name in source object
         * @param toName Destination method name in destination object
         * @param injectArgIndex Parameter index that source method's return data should be injected to in destination method
         * @param injectMethodIndex Parameter index that source method itself should be injected to in destination method
         */
        function appendMethod(from: { [key: string]: any }, to: { [key: string]: any }, fromName: string, toName?: string,
            injectArgIndex?: number, injectMethodIndex?: number): void;
    }
}
