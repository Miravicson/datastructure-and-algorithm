export function serialize<T extends new (...args: any[]) => object>(
  OriginalClass: T,
  ctx: ClassDecoratorContext,
) {
  const className = String(ctx.name);

  return class extends OriginalClass implements Serializable {
    serialize() {
      console.log(`${className}: ${JSON.stringify(this)}`);
    }
  };
}

export interface Serializable {
  serialize(): void;
}

export function isSerializable(target: object): target is Serializable {
  return 'serialize' in target && typeof target.serialize === 'function';
}
