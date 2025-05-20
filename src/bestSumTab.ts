/**
 * Write a function `bestSum(targetSum, numbers)` that takes in a targetSum and an array of numbers as arguments.
 *
 * The function should return an array containing the shortest combination of numbers that add up to exactly the targetsum.
 *
 * If there is a tie for the shortest combination, you may return any one of the shortest
 */

function bestSum(targetSum: number, numbers: number[]): number[] | null {
  const table: (number[] | null)[] = Array(targetSum + 1).fill(null);
  table[0] = [];

  for (let i = 0; i <= targetSum; i++) {
    if (Array.isArray(table[i])) {
      for (let num of numbers) {
        const nextCellIdx = i + num;
        if (nextCellIdx <= targetSum) {
          const tableContents = table[i]!;
          const prev = table[nextCellIdx];
          const current = [...tableContents, num];
          if (prev === null || current.length < prev.length) {
            table[nextCellIdx] = current;
          }
        }
      }
    }
  }

  return table[targetSum];
}

console.log(bestSum(7, [5, 3, 4, 7])); // [7]
console.log(bestSum(8, [2, 3, 5])); // [3, 5]
