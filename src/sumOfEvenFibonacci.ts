function fib2(n: number, memo: Record<number, number> = {}): number {
  if (n in memo) {
    return memo[n];
  }
  if (n < 2) return 1;

  const result = fib2(n - 2, memo) + fib2(n - 1, memo);
  memo[n] = result;
  return result;
}

function* fibGen(memo: Record<number, number>) {
  let n = 1;
  while (true) {
    yield fib2(n, memo);
    n++;
  }
}

function sumFib() {
  const memo: Record<number, number> = {};

  let currentFib = 2;
  const fibIter = fibGen(memo);

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
