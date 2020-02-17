# reflect-extension

Additional methods based on reflect-metadata for runtime reflection and object observe.

This package includes import for `reflect-metadata`.

## CodeAlter

Attach another method's logic after one method finished.

```typescript
Reflect.CodeAlter.appendMethod(from: Object, to: Object, fromName: string, toName?: string, injectArgIndex?: number, injectMethodIndex?: number): void
```

Use `injectArgIndex` to get result from base method, use `injectMethodIndex` to get base method.

## Class metadata

Easy way to define runtime accessable metadata for class, class members and static class members. All metadatas are defined on constructor of class, can access by given class constructor, class prorotype or class instances.

```typescript
Reflect.defineClassMetadata(target: any, name?: string): Reflect.IInjectorInformation;
Reflect.getClassMetadata(target: any, name?: string): Reflect.IInjectorInformation | undefined;
Reflect.getClassMetadataList(target: any): Reflect.IInjectorInformation[] | undefined;
```

Parsing class constructor can only get metadata for static members, while class prototype or instances can only get metadata for instance members.

## Class utilities

A set of functions for class data.

### Prototype forEach

Function that map object's prorotype from self until meet end condition or reach Object's prototype.

```typescript
Reflect.forEachPrototype(root: Object, callbackfn: (item: Object) => void, thisArg?: any, endCondition?: (item: Object) => boolean): void;
```

### Find constructor

Function to get constructor from class, class prototype or class instances, not working with plain object.

```typescript
Reflect.getConstructorOf<T>(target: any): ClassType<T>;
```

### Check inherit

Check if given class is inherit from another class (accept class, class prototype or instances).

```typescript
Reflect.isClassInherit(source: Object, base: any): boolean;
```

### Is function

Check if given target is function.

```typescript
Function.isFunction(source: any): source is Function;
```

## Object observer

Create proxy on object, modify or replace behaviours of value get, pre-set and post-set.

```typescript
Reflect.observeObject<T extends Object>(root: T, options: IObserveOptions): T;
```

The method use `Proxy` to insert or replace behavious on value assigning and reading, with support for recursive observe. 
