/**
 * Say that you are a traveler on a 2D grid, you begin in the top-left corner and your goal is to travel to the bottom-right corner. You may only move down or right.
 *
 * In how many ways can you travel to the goal on a grid with dimensions m * n?
 */

function gridTravelerTab(m: number, n: number): number {
  const table = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  table[1][1] = 1;

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      const current = table[i][j];
      if (j + 1 <= n) {
        table[i][j + 1] += current;
      }

      if (i + 1 <= m) {
        table[i + 1][j] += current;
      }
    }
  }

  return table[m][n];
}

console.log(gridTravelerTab(1, 1)); // 1
console.log(gridTravelerTab(2, 3)); // 3
console.log(gridTravelerTab(3, 2)); // 3
console.log(gridTravelerTab(3, 3)); // 6
console.log(gridTravelerTab(18, 18)); // 2333606220
