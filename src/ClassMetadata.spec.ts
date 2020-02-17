import '.';

describe('ClassMetadata', () => {
    it('should define metadata for method inside class by given prototype', () => {
        class Test {
            public testMethod(): void { }
        }
        Reflect.defineClassMetadata(Test.prototype, 'testMethod');
        const metadata: Reflect.IInjectorInformation | undefined = Reflect.getClassMetadata(Test.prototype, 'testMethod');
        expect(metadata).not.toBeUndefined();
        expect(metadata!.static).toBeFalse();
        expect(metadata!.name).toEqual('testMethod');
    });

    it('should define metadata for method inside class by given constructor', () => {
        class Test {
            public static testMethod(): void { }
        }
        Reflect.defineClassMetadata(Test, 'testMethod');
        const metadata: Reflect.IInjectorInformation | undefined = Reflect.getClassMetadata(Test, 'testMethod');
        expect(metadata).not.toBeUndefined();
        expect(metadata!.static).toBeTrue();
        expect(metadata!.name).toEqual('testMethod');
    });

    it('should define metadata for method inside class by given instance', () => {
        class Test {
            public testMethod(): void { }
        }
        const test = new Test();
        Reflect.defineClassMetadata(test, 'testMethod');
        const metadata: Reflect.IInjectorInformation | undefined = Reflect.getClassMetadata(test, 'testMethod');
        expect(metadata).not.toBeUndefined();
        expect(metadata!.static).toBeFalse();
        expect(metadata!.name).toEqual('testMethod');
    });

    it('should define metadata for class by given prototype', () => {
        class Test { }
        Reflect.defineClassMetadata(Test.prototype);
        const metadata: Reflect.IInjectorInformation | undefined = Reflect.getClassMetadata(Test.prototype);
        expect(metadata).not.toBeUndefined();
        expect(metadata!.static).toBeFalse();
        expect(metadata!.name).toBeUndefined();
    });

    it('should define metadata for class by given constructor', () => {
        class Test { }
        Reflect.defineClassMetadata(Test);
        const metadata: Reflect.IInjectorInformation | undefined = Reflect.getClassMetadata(Test);
        expect(metadata).not.toBeUndefined();
        expect(metadata!.static).toBeTrue();
        expect(metadata!.name).toBeUndefined();
    });

    it('should define metadata for class by given instance', () => {
        class Test { }
        const test = new Test();
        Reflect.defineClassMetadata(test);
        const metadata: Reflect.IInjectorInformation | undefined = Reflect.getClassMetadata(test);
        expect(metadata).not.toBeUndefined();
        expect(metadata!.static).toBeFalse();
        expect(metadata!.name).toBeUndefined();
    });

    it('should define metadata for class by given instance and query by prototype', () => {
        class Test { }
        const test = new Test();
        Reflect.defineClassMetadata(test);
        const metadata: Reflect.IInjectorInformation | undefined = Reflect.getClassMetadata(Test.prototype);
        expect(metadata).not.toBeUndefined();
        expect(metadata!.static).toBeFalse();
        expect(metadata!.name).toBeUndefined();
    });

    it('should define metadata for class by given prototype and query by instance', () => {
        class Test { }
        const test = new Test();
        Reflect.defineClassMetadata(Test.prototype);
        const metadata: Reflect.IInjectorInformation | undefined = Reflect.getClassMetadata(test);
        expect(metadata).not.toBeUndefined();
        expect(metadata!.static).toBeFalse();
        expect(metadata!.name).toBeUndefined();
    });
});
