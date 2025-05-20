/**
 * Write a function `howSum(targetSum, numbers)` that takes in a targetSum and an array of numbers as arguments.
 * The function should return an array containing any combination of elmeents that add up to exactly the targetSum.
 * If there is no combination that adds up to the targetSum, then return null.
 *
 * If there are multiple combinations possible, you may return any single one.
 */

function howSum(targetSum: number, numbers: number[]): number[] | null {
  const table = Array(targetSum + 1).fill(null);
  table[0] = [];

  for (let i = 0; i <= targetSum; i++) {
    if (Array.isArray(table[i])) {
      for (let num of numbers) {
        const nexCellIdx = i + num;
        if (nexCellIdx <= targetSum) {
          const tableContents = table[i];
          table[nexCellIdx] = [...tableContents, num];
        }
      }
    }
  }

  return table[targetSum];
}

console.log(howSum(7, [5, 3, 4])); // [3, 4]
console.log(howSum(7, [5, 3, 4, 7])); // [4, 3]
console.log(howSum(7, [2, 4])); // null
console.log(howSum(8, [2, 3, 5])); // [2, 2, 2, 2]
console.log(howSum(300, [7, 14])); // null
