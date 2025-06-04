import { performance } from 'node:perf_hooks';

export function time0(...args: any[]) {
  return function (): string {
    return 'Hello, Decorator!';
  };
}

export function time1<T extends (...args: any[]) => unknown>(
  method: T,
  ctx: ClassMethodDecoratorContext,
) {
  const methodName = String(ctx.name);
  return function (this: ThisType<T>, ...args: Parameters<T>) {
    const start = performance.now();
    console.log(`${methodName} started`);
    const result = method.call(this, ...args);
    const duration = (performance.now() - start).toFixed(2);
    console.log(`${methodName} ended ${duration} ms`);

    return result as ReturnType<T>;
  };
}

interface HasGetPrice {
  getPrice(): number;
}

export function time2<This extends HasGetPrice, Args extends unknown[], Result>(
  method: (this: This, ...args: Args) => Result,
  ctx: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Result>,
) {
  const methodName = String(ctx.name);
  return function (this: This, ...args: Args): Result {
    const start = performance.now();
    console.log(`${methodName} started`);
    const result = method.call(this, ...args);
    const duration = (performance.now() - start).toFixed(2);
    console.log(`${methodName} ended ${duration} ms`);
    return result;
  };
}

export function time<
  This,
  Args extends unknown[],
  Result extends string | number,
>(
  method: (this: This, ...args: Args) => Result,
  ctx: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Result>,
) {
  const methodName = String(ctx.name);
  return function (this: This, ...args: Args): Result {
    const start = performance.now();
    console.log(`${methodName} started`);
    const result = method.call(this, ...args);
    const duration = (performance.now() - start).toFixed(2);
    console.log(`${methodName} ended ${duration} ms`);
    return result;
  };
}
