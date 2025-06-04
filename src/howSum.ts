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

console.log(successMessage);
