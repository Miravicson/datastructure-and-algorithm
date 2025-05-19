import assert from 'node:assert';

export function testFunc<F extends (...args: any) => any>(opts: {
  func: F;
  failureMessage?: string;
  validate?: (
    result: ReturnType<F>,
    expected: ReturnType<F>,
    args: Parameters<F>,
  ) => boolean;
}) {
  const message = opts?.failureMessage ?? `${opts.func.name} failed ❌`;

  return (args: Parameters<F>, expected: ReturnType<F>) => {
    const result = opts.func(...args);
    const assertInput = opts.validate
      ? opts.validate(result, expected, args)
      : result === expected;
    assert(
      assertInput,
      `${message} while running ${opts.func.name}(...${JSON.stringify(args)}): expected: ${expected}, got: ${result}`,
    );
  };
}
