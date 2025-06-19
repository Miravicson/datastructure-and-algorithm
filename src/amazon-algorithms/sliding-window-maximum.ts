/**
 * 📝 Description:
 * You are given an array of integers nums, and an integer k representing the size of a sliding window.
 * Move the window from left to right across the array and return an array of the maximum value in each window.
 */

function maxSlidingWindowNaive(nums: number[], k: number): number[] {
  function getMax(left: number, right: number) {
    let max = -Infinity;
    for (let i = left; i <= right; i++) {
      max = Math.max(max, nums[i]);
    }

    return max;
  }

  let left = 0;
  let right = k - 1;

  const result = [] as number[];

  while (right < nums.length) {
    result.push(getMax(left, right));
    left++;
    right++;
  }

  return result;
}

function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = []; // indices;
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    if (deque.length && deque[0] < i - k + 1) {
      deque.shift();
    }

    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(nums[i]);

    if (i >= k - 1) {
      result.push(nums[i]);
    }
  }

  return result;
}

// 🔍 Test Cases with Expected Outputs
const testCases: { nums: number[]; k: number; expected: number[] }[] = [
  { nums: [], k: 3, expected: [] }, // []
  { nums: [1], k: 1, expected: [1] }, // [1]
  { nums: [4, 2], k: 2, expected: [4] }, // [4]
  { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3, expected: [3, 3, 5, 5, 6, 7] }, // [3,3,5,5,6,7]
  { nums: [1, 3, 1, 2, 0, 5], k: 3, expected: [3, 3, 2, 5] }, // [3,3,2,5]
  { nums: [9, 11], k: 2, expected: [11] }, // [11]
  { nums: [11, 9], k: 2, expected: [11] }, // [11]
  { nums: [1, -1], k: 1, expected: [1, -1] }, // [1,-1]
  { nums: [7, 2, 4], k: 2, expected: [7, 4] }, // [7,4]
  { nums: [1, 3, 1, 2, 0, 5], k: 6, expected: [5] }, // [5]
];

// 🧪 Execute and Compare
testCases.forEach(({ nums, k, expected }, i) => {
  const result = maxSlidingWindow(nums, k);
  console.log(`Test #${i + 1}:`, result, '// Expected:', expected);
});
