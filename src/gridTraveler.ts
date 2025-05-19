/**
 * Say that you are a traveler on a 2D grid. You begin in the top-left corner and your goal is to travel to the
 * bottom-right corner. You may only move down or right.
 * In how many ways can you travel to the goal on a grid with dimensions m * n?
 * Write a function `gridTraveler(m, n)` that calculates this.
 *
 */

class Memo {
  private readonly store: Record<string, number>;

  constructor() {
    this.store = {};
  }

  /**
   * given that gridTraveler(m, n) == gridTraveler(n, m) the function should return two keys, a key and an
   * alternate key, when given m and n
   * @param m a dimension from the grid
   * @param n another dimension from the grid
   * @private
   */
  private createKey(m: number, n: number): [key: string, alternateKey: string] {
    return [`${m},${n}`, `${n},${m}`];
  }

  /**
   * returns true if the key or alternate key formed from m and n exists.
   * @param m a dimension of the grid
   * @param n another dimension of the grid
   */
  has(m: number, n: number): boolean {
    const [key, alternateKey] = this.createKey(m, n);
    return key in this.store || alternateKey in this.store;
  }

  /**
   * Sets the result to a key formed from m and n as long as no alternate key of m and n exists
   * @param m
   * @param n
   * @param result
   */
  set(m: number, n: number, result: number) {
    if (this.has(n, m)) return; // check to see if the key or an alternate key exists

    const [key] = this.createKey(m, n);
    this.store[key] = result;
  }

  get(m: number, n: number): number {
    const [key, alternateKey] = this.createKey(m, n);
    return this.store[key] ?? this.store[alternateKey];
  }

  get length(): number {
    return Object.keys(this.store).length;
  }
}

function gridTraveler(m: number, n: number, memo = new Memo()): number {
  if (memo.has(m, n)) {
    return memo.get(m, n);
  }
  if (m === 1 && n === 1) {
    return 1;
  }
  if (m === 0 || n === 0) {
    return 0;
  }

  memo.set(m, n, gridTraveler(m - 1, n, memo) + gridTraveler(m, n - 1, memo));
  return memo.get(m, n);
}

console.log('Grid traveler for 1 x 1 grid: ', gridTraveler(1, 1));
console.log('Grid traveler for 2 x 3 grid: ', gridTraveler(2, 3));
console.log('Grid traveler for 3 x 3 grid: ', gridTraveler(3, 3));
console.log('Grid traveler for 5 x 4 grid: ', gridTraveler(5, 4));
console.log('Grid traveler for 4 x 5 grid: ', gridTraveler(4, 5));
