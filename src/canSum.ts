/**
 * Given a number targetSum and an array of numbers nums, return if it's possilbe to get the given targetSum by adding the various numbers in the array together. You are allowed to use the numbers in the array multiple times
 */
import { testFunc } from './testFunc';

function canSum(
  targetSum: number,
  nums: number[],
  memo: Record<number, boolean> = {},
): boolean {
  if (targetSum in memo) {
    return memo[targetSum];
  }
  if (targetSum === 0) {
    return true;
  }
  if (targetSum < 0) {
    return false;
  }



  for (const num of nums) {
    const remainder = targetSum - num;
    const result = canSum(remainder, nums, memo);
    if (result) {
      memo[targetSum] = true;
      return true;
    }
  }
  memo[targetSum] = false;
  return false;
}

const successMessage = 'canSum passed ✅';
const test = testFunc({ func: canSum });

test([7, [1, 2, 5]], true);
test([8, [5, 5]], false);
test([300, [7, 13, 8]], true);

console.log(successMessage);
