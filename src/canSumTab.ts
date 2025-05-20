/**
 * Write a function `canSum(targetSum, numbers)` that takes in a targetSum and an array of numbers as arguments.
 *
 * The function should return a boolean indicating whether or not it is possible to generate the targetSum using numbers from the array.
 * You many use an element of the array as many times as needed.
 * you may assume that all input numbers are nonnegative.
 */


function canSum(targetSum: number, numbers: number[]): boolean {
  const table: boolean[] = Array(targetSum + 1).fill(false);
  table[0] = true;

  for (let i = 0; i <= targetSum; i++) {
    if (table[i]) {
      for (let num of numbers) {
        const nextCellIdx = i + num;
        if (nextCellIdx <= targetSum) {
          table[nextCellIdx] = true;
        }
      }
    }
  }

  return table[targetSum];
}

console.log(canSum(7, [2, 3])); // true
console.log(canSum(7, [5, 3, 4, 7])); // true
console.log(canSum(7, [2, 4])); // false
console.log(canSum(8, [2, 3, 5])); // true
console.log(canSum(300, [7, 14])); // false
