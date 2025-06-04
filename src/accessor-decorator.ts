export function log<This, Args extends unknown[], Result>(
  accessor: (this: This, ...args: Args) => Result,
  ctx: ClassSetterDecoratorContext | ClassGetterDecoratorContext,
) {
  const name = String(ctx.name);

  return function (this: This, ...args: Args): Result {
    if (ctx.kind === 'getter') {
      const result = accessor.call(this, ...args);
      console.log(`${name} get returned ${result}`);
      return result;
    } else {
      console.log(`${name} set to ${args}`);
      return accessor.call(this, ...args);
    }
  };
}
