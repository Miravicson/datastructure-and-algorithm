/**
 * Implemente a function called countUniqueValues
 * which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array but it will always be sorted.
 */

function countUniqueValues(arr: number[]): number {
  if (arr.length < 2) {
    return arr.length;
  }

  let result = 1;
  let l = 0;
  let r = 1;
  while (r < arr.length) {
    if (arr[l] !== arr[r]) {
      result++;
      l = r;
    }
    r++;
  }

  return result;
}
function countUniqueValues2(arr: number[]): number {
  if (arr.length === 0) return 0;
  let i = 0;

  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }

  i++;

  console.log(arr.slice(0, i));

  return i;
}

console.log(countUniqueValues([1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValues([])); // 0
console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4

console.log(countUniqueValues2([1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValues2([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValues2([])); // 0
console.log(countUniqueValues2([-2, -1, -1, 0, 1])); // 4
