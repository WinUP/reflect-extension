import '.';

describe('isClassInherit', () => {
    it('should judge correct if targets have inherit relations', () => {
        class Test1 { }
        class Test2 extends Test1 { }
        class Test3 { }
        const a = new Test1();
        const b = new Test2();
        const c = new Test3();
        expect(Reflect.isClassInherit(a, a)).toBeTrue();
        expect(Reflect.isClassInherit(a, b)).toBeFalse();
        expect(Reflect.isClassInherit(a, c)).toBeFalse();
        expect(Reflect.isClassInherit(b, a)).toBeTrue();
        expect(Reflect.isClassInherit(b, b)).toBeTrue();
        expect(Reflect.isClassInherit(b, c)).toBeFalse();
        expect(Reflect.isClassInherit(c, a)).toBeFalse();
        expect(Reflect.isClassInherit(c, b)).toBeFalse();
        expect(Reflect.isClassInherit(c, c)).toBeTrue();
    });
});
