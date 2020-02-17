import '.';

describe('observeObject', () => {
    it('should call getter when change content', () => {
        const options: Reflect.IObserveOptions = {
            getter: (root, target, name, path, opt) => {
                expect(root).toBeTruthy();
                expect(target.a).toBeTruthy();
                expect(name).toEqual('a');
                expect(path).toEqual('$.a');
                expect(opt).toBeTruthy();
                return 1;
            }
        };
        const test = Reflect.observeObject({ a: { b: { c: [0, 1] } }, b: 0 }, options);
        expect(test.a).toEqual(1 as any);
    });

    it('should not call getter if useGetter is false', () => {
        const options: Reflect.IObserveOptions = {
            getter: () => 1,
            useGetter: (_target, name) => name === 'a'
        };
        const test = Reflect.observeObject({ a: { b: { c: [0, 1] } }, b: 0 }, options);
        expect(test.a).toEqual(1 as any);
        expect(test.b).toEqual(0);
    });

    it('should call setter when change content', () => {
        const options: Reflect.IObserveOptions = {
            preSetter: (root, target, name, path, value, opt) => {
                expect(root).toBeTruthy();
                expect(target.a).toBeTruthy();
                expect(name).toEqual('a');
                expect(path).toEqual('$.a');
                expect(value).toEqual({ b: { c: [1, 2] } });
                expect(opt).toBeTruthy();
                return 1;
            },
            postSetter: (root, target, name, path, value, opt) => {
                expect(root).toBeTruthy();
                expect(target.a).toBeTruthy();
                expect(name).toEqual('a');
                expect(path).toEqual('$.a');
                expect(value).toEqual(1);
                expect(opt).toBeTruthy();
            }
        };
        const test = Reflect.observeObject({ a: { b: { c: [0, 1] } }, b: 0 }, options);
        test.a = { b: { c: [1, 2] } };
        expect(test.a).toEqual(1 as any);
    });

    it('should not call setter if useSetter is false', () => {
        const options: Reflect.IObserveOptions = {
            preSetter: () => 1,
            useSetter: (_target, name) => name === 'a'
        };
        const test = Reflect.observeObject({ a: { b: { c: [0, 1] } }, b: 0 }, options);
        test.a = { b: { c: [1, 2] } };
        test.b = 2;
        expect(test.a).toEqual(1 as any);
        expect(test.b).toEqual(2);
    });

    it('should skip default setter if skipDefaultSetter is true', () => {
        const options: Reflect.IObserveOptions = {
            preSetter: (_root, target, name) => {
                target[name] = 2;
                return 1;
            },
            skipDefaultSetter: true
        };
        const test = Reflect.observeObject({ a: { b: { c: [0, 1] } }, b: 0 }, options);
        test.a = { b: { c: [1, 2] } };
        expect(test.a).toEqual(2 as any);
    });

    it('should apply deep observer', () => {
        const options: Reflect.IObserveOptions = {
            getter: (_root, target, name, path) => path === '$.a.b.c' ? 1 : target[name],
            pathType: [{
                '$': Reflect.PathObserveType.Deep,
                '$.a': Reflect.PathObserveType.Deep,
                '$.a.b': Reflect.PathObserveType.Deep
            }]
        };
        const test = Reflect.observeObject({ a: { b: { c: [0, 1] } }, b: 0 }, options);
        expect(test.a.b.c).toEqual(1 as any);
    });
});
