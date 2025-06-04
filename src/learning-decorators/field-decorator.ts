export function double0(_: unknown, _ctx: ClassFieldDecoratorContext) {
  return function (initialValue: number) {
    return initialValue * 2;
  };
}

export function double<This, FieldType extends number>(
  _: unknown,
  _ctx: ClassFieldDecoratorContext<This, FieldType>,
) {
  return function (initialValue: FieldType) {
    return initialValue * 2;
  };
}
