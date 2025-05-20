/**
 * Given a number targetSum and an array of numbers nums, return the combination of numbers that add up to the target sum, if any. return null otherwise. You are allowed to use the numbers in the array multiple times
 */

import { testFunc } from './testFunc';

function howSum(
  targetSum: number,
  nums: number[],
  memo: Record<number, number[] | null> = {},
): number[] | null {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (const num of nums) {
    const remainder = targetSum - num;
    const remainderResult = howSum(remainder, nums, memo);
    if (remainderResult !== null) {
      memo[targetSum] = [...remainderResult, num];
      return memo[targetSum];
    }
  }
  memo[targetSum] = null;
  return null;
}

const successMessage = 'howSum passed ✅';

const test = testFunc({
  func: howSum,
  validate: (result, expected, args) => {
    console.log(result);
    if (result === null && expected === null) return true;
    if (result) {
      const resultSum = result.reduce((acc, i) => acc + i, 0);
      const targetSum = args[0];
      return resultSum === targetSum;
    }

    return false;
  },
});

test([7, [3, 2, 5]], [2, 5]);
test([8, [5, 5]], null);

console.log(successMessage);
