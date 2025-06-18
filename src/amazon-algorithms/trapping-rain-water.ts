/**
 * Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
 * Heuristic = water trapped at each index = min(maxLeft, maxRight) - height[i]
 */

function trap(heights: number[]): number {
  let totalWater = 0;
  let left = 0;
  let right = heights.length - 1;
  let leftMax = 0;
  let rightMax = 0;

  while (left < right) {
    if (heights[left] < heights[right]) {
      const heightAtPos = heights[left];
      if (heightAtPos >= leftMax) {
        leftMax = heightAtPos;
      } else {
        totalWater += leftMax - heightAtPos;
      }
      left++;
    } else {
      const heightAtPos = heights[right];
      if (heightAtPos >= rightMax) {
        rightMax = heightAtPos;
      } else {
        totalWater += rightMax - heightAtPos;
      }
      right--;
    }
  }
  return totalWater;
}

const testCases = [
  [], // 0
  [0], // 0
  [4, 2, 3], // 1
  [5, 4, 1, 2], // 1
  [3, 0, 2, 0, 4], // 7
  [1, 1, 1, 1, 1], // 0
  [0, 2, 0, 2, 0], // 2
  [2, 0, 2, 0, 2, 0, 2], // 6
  [2, 1, 0, 1, 3], // 4
  [9, 6, 8, 8, 5, 6, 3], // 3
];

testCases.forEach((input, i) => {
  console.log(`Test Case #${i + 1}:`, trap(input));
});
