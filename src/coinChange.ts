/**
 * You are given coins of different values and a total amount of money.
 * write a function to compute the fewest number of coins that you need to make up that amount.
 * If it’s not possible, return -1.
 */

function coinChange(
  amount: number,
  coins: number[],
  memo: Record<number, number> = {},
): number {
  if (amount in memo) {
    return memo[amount];
  }
  if (amount === 0) {
    return 0;
  }

  if (amount < 0) return -1;

  let shortestCombination = -1;

  for (const coin of coins) {
    const resultCombo = coinChange(amount - coin, coins, memo);

    if (resultCombo >= 0) {
      const combination = resultCombo + 1;

      if (shortestCombination === -1 || shortestCombination > combination) {
        shortestCombination = combination;
      }
    }
  }

  memo[amount] = shortestCombination;

  return shortestCombination;
}

console.log(coinChange(11, [1, 2, 5])); // 3
console.log(coinChange(3, [2])); // -1
console.log(coinChange(0, [1])); // 0
console.log(coinChange(2, [1])); // 2
console.log(coinChange(6249, [186, 419, 83, 408])); // 20
console.log(coinChange(27, [2, 5, 10, 1])); // 4
console.log(coinChange(8839, [3, 7, 405, 436])); // 25

function minCoinChange(coins: number[], amount: number): number[] | null {
  // write your code here

  let result = null;

  if (amount === 0) {
    return [];
  }

  if (amount < 0) {
    return null;
  }

  for (const coin of coins) {
    const comboOrNull = minCoinChange(coins, amount - coin);

    if (comboOrNull === null) continue;

    const comboFromCurrentCoin = [...comboOrNull, coin];

    if (result === null || comboFromCurrentCoin.length < result.length) {
      result = comboFromCurrentCoin;
    }
  }

  return (result || []).sort((a, b) => b - a);
}

console.log(minCoinChange([1, 2, 3, 4, 5], 11));

console.log(minCoinChange([5, 10, 15, 20, 25], 85));

console.log(minCoinChange([1, 5, 6, 9], 11));

function countCoinChange(
  denominations: number[],
  amount: number,
  memo: Record<string, number> = {},
  start: number = 0, // ensures that we are dealing with combination and not permutations
): number {
  // add whatever parameters you deem necessary - good luck!

  const key = `${amount}-${start}`;
  if (key in memo) {
    return memo[key];
  }

  if (amount === 0) {
    return 1;
  }

  if (amount < 0) {
    return 0;
  }

  let sum = 0;

  for (let i = start; i < denominations.length; i++) {
    const remainder = amount - denominations[i];

    sum += countCoinChange(denominations, remainder, memo, i);
  }

  memo[key] = sum;

  return sum;
}

const memo: Record<string, number> = {};

const denominations = [1, 5, 10, 25];
console.log(countCoinChange(denominations, 1)); // 1
console.log(countCoinChange(denominations, 2)); // 1
console.log(countCoinChange(denominations, 5)); // 2
console.log(countCoinChange(denominations, 10, memo)); // 4

console.log(memo);
