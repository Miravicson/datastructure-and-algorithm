/**
 * Write a function called miSubArrayLen which accepts two parameters - an array of positive integers and a positive integer.
 * This function should return the minimal length of a contiguous sub array of which the sum is greater than or equal to the integer passed to the function. if there isn't one return 0 instead.
 */

function minSubArrayLen(arr: number[], sum: number): number {
  let minLength = Infinity;
  let total = 0;

  let start = 0;
  let end = 0;

  while (start < arr.length) {
    if (total < sum && end < arr.length) {
      total += arr[end++];
    } else if (total >= sum) {
      minLength = Math.min(minLength, end - start);
      total -= arr[start++];
    } else {
      break;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7));
console.log(minSubArrayLen([2, 1, 6, 5, 4], 9))
