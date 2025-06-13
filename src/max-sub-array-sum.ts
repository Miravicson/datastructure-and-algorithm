/**
 * Given an array of integers and a number, write a function called maxSubArraySum, which finds the maximum sum of subarray with the length of numbers passed to the function.
 */

function maxSubArraySum(arr: number[], length: number): number | null {
  const result = new Result(arr, length);
  return result.maximumSum;
}

class Result {
  private arr: number[];
  private window: number;
  private accumulator: number;
  private curr: number;
  private result: number;

  constructor(arr: number[], window: number) {
    this.arr = arr;
    this.window = window;
    this.accumulator = 0;
    this.curr = 0;
    this.result = -Infinity;
  }

  get maximumSum(): number | null {
    if (this.arr.length < this.window) return null;

    while (this.curr < this.window) {
      this.accumulator = this.accumulator + this.arr[this.curr++];
    }

    if (this.window === this.arr.length) {
      return this.accumulator;
    }

    while (this.curr < this.arr.length) {
      this.accumulator =
        (this.accumulator ?? 0) +
        this.arr[this.curr] -
        this.arr[this.curr - this.window];

      if (this.accumulator > this.result) {
        this.result = this.accumulator;
      }
      this.curr++;
    }

    return this.result;
  }
}

console.log(maxSubArraySum([100, 200, 300, 400], 2)); // 700
console.log(maxSubArraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39
