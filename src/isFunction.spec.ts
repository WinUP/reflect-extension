import '.';

describe('isFunction', () => {
    it('should judge correct if target is function', () => {
        class Test { }
        const test = new Test();
        expect(Function.isFunction(0)).toBeFalse();
        expect(Function.isFunction(0.1)).toBeFalse();
        expect(Function.isFunction(NaN)).toBeFalse();
        expect(Function.isFunction('')).toBeFalse();
        expect(Function.isFunction('test')).toBeFalse();
        expect(Function.isFunction(true)).toBeFalse();
        expect(Function.isFunction(false)).toBeFalse();
        expect(Function.isFunction(null)).toBeFalse();
        expect(Function.isFunction(undefined)).toBeFalse();
        expect(Function.isFunction([])).toBeFalse();
        expect(Function.isFunction([1])).toBeFalse();
        expect(Function.isFunction([function () { }])).toBeFalse();
        expect(Function.isFunction([() => { }])).toBeFalse();
        expect(Function.isFunction({})).toBeFalse();
        expect(Function.isFunction(test)).toBeFalse();
        expect(Function.isFunction(Test.prototype)).toBeFalse();

        expect(Function.isFunction(Test)).toBeTrue();
        expect(Function.isFunction(function* x() { })).toBeTrue();
        expect(Function.isFunction(async function x() { })).toBeTrue();
        expect(Function.isFunction(async function* x() { })).toBeTrue();
        expect(Function.isFunction(() => { })).toBeTrue();
        expect(Function.isFunction(async () => { })).toBeTrue();
        expect(Function.isFunction(new Proxy(() => { }, {}))).toBeTrue();
        expect(Function.isFunction(new Proxy(function () { }, {}))).toBeTrue();
    });
});
