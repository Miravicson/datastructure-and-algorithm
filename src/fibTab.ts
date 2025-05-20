/**
 * Write a function `fib(n)` that takes in a number as an argument.
 * The function should return the n-th number of the Fibonacci sequence.
 *
 * The 0th number of the sequence is 0.
 * The 1st number of the sequence is 1.
 *
 *
 * To generate the next number of the sequence, we sum the previous two
 * n:      0, 1, 2, 3, 4, 5, 6, 7,  8,  9
 * fib(n): 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
 */

function fib(n: number): number {
  const table = Array.from({ length: n + 1 }, (_, i) => {
    if (i <= 1) {
      return i;
    } else {
      return 0;
    }
  });
  // for (let i = 2; i <= n; i++) {
  //   table[i] = table[i - 2] + table[i - 1];
  // }

  for (let i = 0; i <= n; i++) {
    table[i + 1] += table[i]
    table[i + 2] += table[i]
  }

  return table[n];
}

console.log(fib(6)); // 8
console.log(fib(7)); // 13
console.log(fib(8)); // 21
console.log(fib(50)); // 12486269025

