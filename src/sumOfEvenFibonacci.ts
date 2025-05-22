function fib(n: number, memo: Record<number, number> = {}): number {
  if (n in memo) {
    return memo[n];
  }
  if (n < 2) return 1;

  const result = fib(n - 2, memo) + fib(n - 1, memo);
  memo[n] = result;
  return result;
}

function* fibGen(memo: Record<number, number>) {
  let n = 1;
  while (true) {
    yield fib(n, memo);
    n++;
  }
}

function sumFib() {
  let memo: Record<number, number> = {};

  let currentFib = 2;
  let fibIter = fibGen(memo);

  let result = 0n;
  while (currentFib < 4_000_000) {
    currentFib = fibIter.next().value!;
    if (currentFib % 2 === 0) {
      result += BigInt(currentFib);
    }
  }
  return result;
}

console.log(sumFib());
