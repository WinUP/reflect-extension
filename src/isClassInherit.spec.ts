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

        expect(Reflect.isClassInherit(Test1, Test1)).toBeTrue();
        expect(Reflect.isClassInherit(Test1, Test2)).toBeFalse();
        expect(Reflect.isClassInherit(Test1, Test3)).toBeFalse();
        expect(Reflect.isClassInherit(Test2, Test1)).toBeTrue();
        expect(Reflect.isClassInherit(Test2, Test2)).toBeTrue();
        expect(Reflect.isClassInherit(Test2, Test3)).toBeFalse();
        expect(Reflect.isClassInherit(Test3, Test1)).toBeFalse();
        expect(Reflect.isClassInherit(Test3, Test2)).toBeFalse();
        expect(Reflect.isClassInherit(Test3, Test3)).toBeTrue();

        expect(Reflect.isClassInherit(Test1, a)).toBeTrue();
        expect(Reflect.isClassInherit(Test1, b)).toBeFalse();
        expect(Reflect.isClassInherit(Test1, c)).toBeFalse();
        expect(Reflect.isClassInherit(b, Test1)).toBeTrue();
        expect(Reflect.isClassInherit(Test2, Test2)).toBeTrue();
        expect(Reflect.isClassInherit(Test2, c)).toBeFalse();
        expect(Reflect.isClassInherit(c, Test1)).toBeFalse();
        expect(Reflect.isClassInherit(Test3, Test2)).toBeFalse();
        expect(Reflect.isClassInherit(Test3, c)).toBeTrue();
    });
});
