/**
 * Given a number targetSum and an array of numbers num, return the most efficient combination of numbers from the array of numbers that sums up to the target sum. Efficiency increases with decrease in the lenght of combination
 */

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

console.log(bestSum(7, [5, 3, 4, 7])); // [7]
console.log(bestSum(8, [2, 3, 5])); // [3, 5]
