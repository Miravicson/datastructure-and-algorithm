/**
 * Given an array of integers, return true if the following conditions are fulfilled
 *  Length of the array is bigger than or equal to 3
 * There exists some index i such that: a[0] < a[1] ... < a[i]
 * a[i] > a[i+1] > ... > a[a.size - 1]
 */

function isMountain(nums: number[]): boolean {
  let count = 1;
  while (nums[count - 1] < nums[count]) {
    count++;
  }

  if (count === 1 || count === nums.length) {
    return false
  }
  while (nums[count - 1] > nums[count]) {
    count++;
  }

  return count === nums.length;
}

console.log(isMountain([1, 2, 1])); // true
console.log(isMountain([0, 0, 0])); // false
console.log(isMountain([1, 2, 3, 4, 5, 4, 1, 0])); // true
console.log(isMountain([1, 1, 2, 3, 4, 1])); // false
console.log(isMountain([1])); // false
console.log(isMountain([1, 2, 3, 4])); // false
