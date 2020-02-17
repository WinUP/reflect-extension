(function () {
    Reflect.getClassMetadataList = function (target: any): Reflect.IInjectorInformation[] | undefined {
        const constructor: ClassType = Reflect.getConstructorOf(target);
        return Reflect.getMetadata(Reflect.InjectorMetadataName, constructor);
    };
})();
