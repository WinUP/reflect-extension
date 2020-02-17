import '.';

describe('forEachPrototype', () => {
    it('should map all members of class', () => {
        class Test1 {  }
        class Test2 extends Test1 { }
        class Test3 extends Test2 { }
        const test = new Test3();
        let count: number = 0;
        Reflect.forEachPrototype(test, item => {
            switch (count) {
                case 0:
                    expect(item).toEqual(Test3.prototype);
                    break;
                case 1:
                    expect(item).toEqual(Test2.prototype);
                    break;
                case 2:
                    expect(item).toEqual(Test1.prototype);
                    break;
            }
            ++count;
        });
        expect(count).toEqual(3);
    });

    it('should stop at end condition', () => {
        class Test1 {  }
        class Test2 extends Test1 { }
        class Test3 extends Test2 { }
        const test = new Test3();
        let count: number = 0;
        Reflect.forEachPrototype(test, () => ++count, undefined, item => item !== Test1.prototype);
        expect(count).toEqual(2);
    });
});
