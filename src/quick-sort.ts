import { swap } from './utils';

function pivot(arr: number[], startIdx = 0, endIdx = arr.length - 1): number {
  let pivotIdx = startIdx;
  const pivot = arr[pivotIdx];

  for (let i = startIdx; i <= endIdx; i++) {
    if (arr[i] < pivot) {
      pivotIdx++;
      swap(arr, i, pivotIdx);
    }
  }

  swap(arr, startIdx, pivotIdx);
  return pivotIdx;
}

function quickSort(arr: number[], left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIdx = pivot(arr, left, right);
    // left
    quickSort(arr, left, pivotIdx - 1);
    // right
    quickSort(arr, pivotIdx + 1, right);
  }

  return arr;
}

console.log(quickSort([4, 6, 9, 1, 2, 5]));
