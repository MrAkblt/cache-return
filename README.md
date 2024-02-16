# usage
```ts
class A {
  @cacheReturn(2 * 24 * 60 * 60 * 1000) // 2 days
  test(x) {
    return new Promise((res) => setTimeout(() => res(x), 1000))
  }
}

const a = new A();
a.test(2); // Output 2 from function
a.test(2); // Output 2 from cache
a.test(2); // Output 2 from cache
```
