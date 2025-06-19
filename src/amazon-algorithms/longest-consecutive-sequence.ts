/**
 * Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
	•	You must write an algorithm that runs in O(n) time.
 */

function longestConsecutive(nums: number[]): number {
  let maxLength = 0;

  const valueSet = new Set(nums);
  for (const num of valueSet) {
    if (!valueSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;
      while (valueSet.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }
      maxLength = Math.max(maxLength, currentStreak);
    }
  }

  return maxLength;
}

const testCases: number[][] = [
  [], // Output: 0
  [1], // Output: 1
  [1, 2, 0, 1], // Output: 3
  [100, 4, 200, 1, 3, 2], // Output: 4
  [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6], // Output: 7
  [10, 30, 20, 40], // Output: 1 (no consecutive)
  [1, 3, 5, 2, 4], // Output: 5
  [0, -1, 1], // Output: 3
  [5, 2, 99, 3, 4, 100, 1], // Output: 5
  [1, 2, 0, 1, 3, 5, 6, 7, 8, 4], // Output: 9
];

testCases.forEach((test, i) => {
  console.log(`Test #${i + 1}:`, longestConsecutive(test));
});

export {};
