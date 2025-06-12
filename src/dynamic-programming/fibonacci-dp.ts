function fiboDPIter(n: number) {
  let [a0, a1] = [0, 1];

  for (let i = 0; i < n; i++) {
    [a0, a1] = [a1, a0 + a1];
  }
  return a0;
}

function fiboDPMemo(
  n: number,
  memo: Record<number, number> = { 0: 0, 1: 1, 2: 1 },
): number {
  if (n in memo) {
    return memo[n];
  }

  memo[n] = fiboDPMemo(n - 2, memo) + fiboDPMemo(n - 1, memo);

  return memo[n];
}

function fiboDPTab(n: number): number {
  const table: number[] = Array(n + 1).fill(0);
  table[0] = 0;
  table[1] = 1;
  for (let i = 0; i <= n; i++) {
    table[i + 1] += table[i];
    table[i + 2] += table[i];
  }

  return table[n];
}

function fiboDPTab2(n: number): number {
  if (n <= 2) return 1;
  const table = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    table[i] = table[i - 2] + table[i - 1];
  }

  return table[n];
}

class FibIter implements Iterable<number> {
  private shouldStop = false;
  constructor(private n: number) {}

  *fib() {
    let [a0, a1] = [0, 1];
    for (let i = 0; i < this.n; i++) {
      [a0, a1] = [a1, a0 + a1];
      yield a0;
    }
  }

  break() {
    this.shouldStop = true;
  }

  *[Symbol.iterator](): Iterator<number> {
    yield* this.fib();
  }
}

console.log(fiboDPIter(5));
console.log(fiboDPTab(5));
console.log(fiboDPTab2(5));

console.log([...new FibIter(5)]);
