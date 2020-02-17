(function () {
    Reflect.getClassMetadata = function (target: any, name?: string): Reflect.IInjectorInformation | undefined {
        const constructor: ClassType = Reflect.getConstructorOf(target);
        const isStatic = constructor === target;
        return Reflect.getClassMetadataList(constructor)?.find(e => e.name === name && e.static === isStatic);
    };
})();
