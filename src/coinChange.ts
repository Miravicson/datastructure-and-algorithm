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
