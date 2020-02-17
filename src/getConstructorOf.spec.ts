import '.';

describe('getConstructorOf', () => {
    it('should get constructor by given instance', () => {
        class Test { }
        const test = new Test();
        expect(Reflect.getConstructorOf(test)).toEqual(Test);
    });

    it('should get constructor by given constructor', () => {
        class Test { }
        expect(Reflect.getConstructorOf(Test)).toEqual(Test);
    });

    it('should get constructor by given constructor\'s prototype', () => {
        class Test { }
        expect(Reflect.getConstructorOf(Test.prototype)).toEqual(Test);
    });
});
