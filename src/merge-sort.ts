import { assertEqual } from './utils';

/**
 * Splits an array approximately in half and returns the result as elements
 * of a two element tuple.
 * @param arr The array to be split
 * @returns a 2-element tuple containing the split array
 */
function split(arr: number[]): [number[], number[]] {
  const midIdx = Math.floor(arr.length / 2);
  return [arr.slice(0, midIdx), arr.slice(midIdx)];
}

/**
 * Pick elements from one array and push it to another array
 * @param startIdx index of fromArr to start from
 * @param fromArr The array from which elements are picked
 * @param toArr The array to which elements are added
 */
function addRemainingFrom(
  startIdx: number,
  fromArr: number[],
  toArr: number[],
) {
  for (let i = startIdx; i < fromArr.length; i++) {
    toArr.push(fromArr[i]);
  }
}

/**
 * Takes two sorted array and merges them in a sorted order
 * @param a sorted array a
 * @param b sorted array b
 * @returns merged sorted array
 */
function merge(a: number[], b: number[]): number[] {
  let aIdx = 0;
  let bIdx = 0;

  const result: number[] = [];

  while (aIdx < a.length && bIdx < b.length) {
    if (a[aIdx] < b[bIdx]) {
      result.push(a[aIdx]);
      aIdx++;
    } else {
      result.push(b[bIdx]);
      bIdx++;
    }
  }

  addRemainingFrom(aIdx, a, result);
  addRemainingFrom(bIdx, b, result);

  return result;
}

/**
 * Sorts an array using the merge sort algorithm
 * @param arr Array to be sorted
 * @returns A sorted array
 */
function mergeSort(arr: number[]): number[] {
  if (arr.length < 2) {
    return arr;
  }
  // return merge(...(split(arr).map(mergeSort)) as [number[], number[]]); // one-liner

  const [left, right] = split(arr);
  return merge(mergeSort(left), mergeSort(right));
}

const successMessage = 'Merge sort passed ✅';
const failureMessage = 'Merge sort failed ❌';

assertEqual(mergeSort([5, 2, 1]), [1, 2, 5], failureMessage);
assertEqual(mergeSort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5], failureMessage);
console.log(successMessage);
