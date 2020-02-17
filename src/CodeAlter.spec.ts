import '.';

describe('CodeAlter', () => {
    it('should copy properties from A to B', () => {
        const a = { test1: 1, test2: 2 };
        const b = { test2: 3, test3: 4};
        Reflect.CodeAlter.copyProperties(a, b);
        expect((b as any).test1).toEqual(1);
        expect(b.test2).toEqual(2);
        expect(b.test3).toEqual(4);
    });

    it('should append method B after method A', () => {
        const data = { a: () => 1,  b: () => 2 };
        Reflect.CodeAlter.appendMethod(data, data, 'b', 'a');
        expect(data.a()).toEqual(2);
    });

    it('should return method A\'s data to method B', () => {
        const data = { a: () => 1,  b: (x: number) => x + 1 };
        Reflect.CodeAlter.appendMethod(data, data, 'b', 'a', 0);
        expect(data.a()).toEqual(2);
    });

    it('should insert method A to method B\'s argument list', () => {
        const data = { a: () => 1,  b: (x: () => number) => x() + 1 };
        Reflect.CodeAlter.appendMethod(data, data, 'b', 'a', undefined, 0);
        expect(data.a()).toEqual(2);
    });

    it('should insert method A and its result to method B\'s argument list', () => {
        const data = {
            a: (x: number, y: number) => x + y,
            b: (a: (x: number, y: number) => number, r: number, x: number, y: number) => a(x, y) + r };
        Reflect.CodeAlter.appendMethod(data, data, 'b', 'a', 1, 0);
        expect(data.a(1, 1)).toEqual(4);
    });
});
