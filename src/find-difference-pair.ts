/**
 * Given an unsorted array of a number n, find if there exists a pair of elements in the array whose difference is n. This function should return true if the pair exists or false if it does not;
 * @param arr
 * @param diff
 */
function findDiffPair(arr: number[], diff: number): boolean {
  const counter = new Counter2(arr);

  for (const el of arr) {
    counter.remove(el);
    if (counter.has(el - diff)) {
      return true;
    }

    counter.add(el);
  }
  return false;
}

class Counter2 {
  private count = {} as Record<number, number>;
  constructor(arr: number[]) {
    arr.forEach((element) => {
      this.add(element);
    });
  }

  add(element: number): number {
    this.count[element] = (this.count[element] ?? 0) + 1;
    return this.count[element];
  }

  remove(element: number): boolean {
    if (this.count[element] === undefined || this.count[element] === 0)
      return false;

    this.count[element] -= 1;
    return true;
  }

  has(element: number): boolean {
    return (this.count[element] ?? 0) > 0;
  }
}

console.log(findDiffPair([6, 1, 4, 10, 2, 4], 2)); // true
console.log(findDiffPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)); // true
console.log(findDiffPair([4, -2, 3, 10], -6)); // true
console.log(findDiffPair([6, 1, 4, 10, 2, 4], 22)); // false
console.log(findDiffPair([], 0)); // false
console.log(findDiffPair([5, 5], 0)); // true
console.log(findDiffPair([-4, 4], -8)); // true
console.log(findDiffPair([-4, 4], 8)); // true
console.log(findDiffPair([1, 3, 4, 6], -2)); // true
console.log(findDiffPair([0, 1, 3, 4, 6], -2)); // true
console.log(findDiffPair([1, 2, 3], 0)); // false
