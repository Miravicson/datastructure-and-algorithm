import assert from 'node:assert';
/**
 * A utility function to test a function with given arguments and expected result.
 * It allows for custom validation logic and provides a failure message if the test fails.
 *
 * @param opts - Options for the test function
 * @param opts.func - The function to be tested
 * @param opts.failureMessage - Optional custom failure message
 * @param opts.validate - Optional custom validation function to compare results
 * @returns A function that takes arguments and expected result to perform the test
 */
export function testFunc<F extends (...args: readonly unknown[]) => unknown>(opts: {
  func: F;
  failureMessage?: string;
  validate?: (
    result: ReturnType<F>,
    expected: ReturnType<F>,
    args: Parameters<F>,
  ) => boolean;
}) {
  const message = opts.failureMessage ?? `${opts.func.name} failed ❌`;

  return (args: Parameters<F>, expected: ReturnType<F>) => {
    const result = opts.func(...args) as ReturnType<F>;
    const assertInput = opts.validate
      ? opts.validate(result, expected, args)
      : result === expected;
    assert(
      assertInput,
      `${message} while running ${opts.func.name}(...${JSON.stringify(args)}): expected: ${expected}, got: ${result}`,
    );
  };
}