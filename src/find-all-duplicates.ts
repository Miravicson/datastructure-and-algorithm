/**
 * Given an array of positive integers, some elements appear twice and others appear once. Find all the elements that appear twice in this array. You can return the elements in any other.
 */

function findAllDuplicates(arr: number[]): number[] {
  const elementSet = new Set<number>();
  const result = new Set<number>();

  for (const el of arr) {
    if (elementSet.has(el)) {
      result.add(el);
    } else {
      elementSet.add(el);
    }
  }

  return Array.from(result);
}

console.log(findAllDuplicates([4, 3, 2, 7, 8, 2, 3, 1])); // [2, 3]
console.log(findAllDuplicates([4, 3, 2, 1, 0])); // []
console.log(findAllDuplicates([4, 3, 2, 1, 0, 1, 2, 3])); // [3, 2, 1]
