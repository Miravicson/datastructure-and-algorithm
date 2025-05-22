/**
 * Given an m*n grid with a robo located at the top left corner 0,0
 * the robot can only move down or right at any given point in time, how many possible unique paths are there to reach this final cell
 */

function uniquePaths(
  m: number,
  n: number,
  memo: Record<string, number> = {},
): number {
  const indexKey = `${m},${n}`;
  const compKey = `${n},${m}`;
  if (indexKey in memo) return memo[indexKey];
  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;

  const result = uniquePaths(m - 1, n, memo) + uniquePaths(m, n - 1, memo);
  memo[indexKey] = result;
  memo[compKey] = result;
  return result;
}

function factorial(n: number): number {
  if (n <= 0) return 1;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
}

function uniquePathsMath(m: number, n: number): number {
  const numerator = factorial(m + n - 2);
  const denominator = factorial(m - 1) * factorial(n - 1);
  return numerator / denominator;
}

console.log(uniquePaths(1, 1)); // 1
console.log(uniquePaths(1, 5)); // 1
console.log(uniquePaths(5, 1)); // 1
console.log(uniquePaths(2, 2)); // 2
console.log(uniquePaths(2, 3)); // 3
console.log(uniquePaths(3, 2)); // 3
console.log(uniquePaths(3, 3)); // 6
console.log(uniquePaths(10, 10)); // 48620
console.log(uniquePaths(23, 12)); // 193536720
console.log(`---------------------------`);
console.log(uniquePathsMath(1, 1)); // 1
console.log(uniquePathsMath(1, 5)); // 1
console.log(uniquePathsMath(5, 1)); // 1
console.log(uniquePathsMath(2, 2)); // 2
console.log(uniquePathsMath(2, 3)); // 3
console.log(uniquePathsMath(3, 2)); // 3
console.log(uniquePathsMath(3, 3)); // 6
console.log(uniquePathsMath(10, 10)); // 48620
console.log(uniquePathsMath(23, 12)); // 193536720
