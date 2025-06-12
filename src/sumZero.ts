/**
 * Write a function called sumZero which accepts a sorted array of integers. The function should find the first pari where the sum is 0. Return an array that includes both values that sum to zero or undefined
 */

function sumZero(arr: number[]): [first: number, second: number] | undefined {
  let left = 0;
  let right = arr.length - 1;

  let leftNum = arr[left];
  let rightNum = arr[right];
  let sum = leftNum + rightNum;

  while (left < right) {
    if (sum === 0) {
      return [leftNum, rightNum];
    } else if (sum < 0) {
      leftNum = arr[++left];
    } else {
      rightNum = arr[--right];
    }

    sum = leftNum + rightNum;
  }

  return undefined;
}


console.log(sumZero([-3, -2, -1, 0, 1, 2, 3])) // [-3, 3]
console.log(sumZero([-2, 0, 1, 3])) // undefined
console.log(sumZero([1,2,3])) // undefined
