/**
 * Given a number targetSum and an array of numbers num, return the most efficient combination of numbers from the array of numbers that sums up to the target sum. Efficiency increases with decrease in the lenght of combination
 */

import { testFunc } from './testFunc';

function bestSum(
  targetSum: number,
  nums: number[],
  memo: Record<number, number[] | null> = {},
): number[] | null {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) {
    return [];
  }
  if (targetSum < 0) return null;

  let shortestCombination: number[] | null = null;
  for (const num of nums) {
    const result = bestSum(targetSum - num, nums, memo);
    if (result !== null) {
      const combination = [...result, num];
      if (
        !shortestCombination ||
        shortestCombination.length > combination.length
      ) {
        shortestCombination = combination;
      }
    }
  }

  memo[targetSum] = shortestCombination;
  return shortestCombination;
}

const successMessage = 'bestSum passed ✅';
const test = testFunc({
  func: bestSum,
  validate: (result, expected, args) => {
    console.log(`Result, Expected`, result, expected);

    if (result === null && expected === null) return true;

    if (result!.length === expected!.length) {
      return result?.reduce((acc, i) => acc + i, 0) === args[0];
    }
    return false;
  },
});

test([7, [1, 2, 5]], [5, 2]);
test(
  [777, [3, 5, 7, 11, 45]],
  [45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 7, 5],
);

console.log(successMessage);
