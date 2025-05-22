/**
 * You are climbing a staircase, it takes n steps to reach the top, Each tie you can either clim 1 or 2 steps in how may distinct ways can you climb to the top
 */

function climbStairs(n: number, memo: Record<number, number> = {}): number {
  if (n in memo) {
    return memo[n];
  }
  if (n === 0) {
    return 1;
  }

  if (n < 0) {
    return 0;
  }

  const result = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  memo[n] = result;
  return result;
}

function climbStairsTab(n: number): number {
  const table = Array(n + 1).fill(0);
  table[0] = 1;

  for (let i = 0; i < n; i++) {
    table[i + 1] += table[i];
    table[i + 2] += table[i];
  }

  return table[n];
}

console.log(climbStairs(1)); // 1
console.log(climbStairs(2)); // 2
console.log(climbStairs(3)); // 3
console.log(climbStairs(4)); // 5
console.log(climbStairs(5)); // 8
console.log(climbStairs(45)); // 1836311903


console.log(climbStairsTab(1)); // 1
console.log(climbStairsTab(2)); // 2
console.log(climbStairsTab(3)); // 3
console.log(climbStairsTab(4)); // 5
console.log(climbStairsTab(5)); // 8
console.log(climbStairsTab(45)); // 1836311903