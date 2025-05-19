import assert from 'node:assert';

/**
 * Returns the nth fibonacci number
 * @param n the nth fibonacci number
 * @param memo the memoization data structure that has the results of calling fib
 * @returns a number representing the nth fibonacci number
 */
function fib(
  n: number,
  memo: Record<number, number> = { 0: 0, 1: 1, 2: 1 },
): number {
  if (n in memo) {
    return memo[n];
  }
  memo[n] = fib(n - 2, memo) + fib(n - 1, memo);
  return memo[n];
}

const successMessage = 'fibonacci passed ✅';
const failureMessage = 'fibonacci failed ❌';

assert(fib(1) === 1, `${failureMessage}: expected ${1}, got: ${fib(1)}`);
assert(fib(2) === 1, `${failureMessage}: expected ${1}, got: ${fib(2)}`);
assert(fib(3) === 2, `${failureMessage}: expected ${2}, got: ${fib(3)}`);
assert(fib(4) === 3, `${failureMessage}: expected ${3}, got: ${fib(4)}`);
assert(fib(5) === 5, `${failureMessage}: expected ${3}, got: ${fib(5)}`);
assert(fib(7) === 13, `${failureMessage}: expected ${13}, got: ${fib(7)}`);
assert(fib(14) === 377, `${failureMessage}: expected ${377}, got: ${fib(14)}`);
console.log(successMessage);
console.log(fib(50));
// console.log(fibMemo);
