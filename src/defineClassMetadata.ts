(function () {
    Reflect.defineClassMetadata = function (target: any, name?: string): Reflect.IInjectorInformation {
        const constructor: ClassType = Reflect.getConstructorOf(target);
        const isStatic = constructor === target;
        const list: Reflect.IInjectorInformation[] = Reflect.getMetadata(Reflect.InjectorMetadataName, constructor) || [];
        let item = list.find(e => e.name === name && e.static === isStatic);
        if (!item) {
            item = { name: name, static: isStatic, extra: {} };
            list.push(item);
        }
        Reflect.defineMetadata(Reflect.InjectorMetadataName, list, constructor);
        return item;
    };
})();
