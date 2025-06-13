/**
 * Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average
 */

function averagePair(arr: number[], target: number): boolean {
  const pA = new PairAverage(arr, target);
  return pA.hasMatchingPair();
}

class PairAverage {
  data: number[];
  target: number;

  private left: number;
  private right: number;

  constructor(arr: number[], target: number) {
    this.data = arr;
    this.target = target;
    this.left = 0;
    this.right = arr.length - 1;
  }

  get pairAverage(): number {
    return (this.data[this.left] + this.data[this.right]) / 2;
  }

  get size(): number {
    return this.data.length;
  }

  hasMatchingPair(): boolean {
    while (this.right < this.size && this.left < this.right) {
      if (this.pairAverage < this.target) {
        this.left++;
      } else if (this.pairAverage > this.target) {
        this.right--;
      } else {
        return true;
      }
    }
    return false;
  }
}

console.log(averagePair([1, 2, 3], 2.5)); // true
console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); // true
console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); // false
console.log(averagePair([], 4)); // false
