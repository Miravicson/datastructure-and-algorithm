import { swap } from '../utils';

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
  console.log(pivotIdx, arr)
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

// console.log(quickSort([4, 6, 9, 1, 2, 5]));
console.log(quickSort([4, 2, 3]))
// [4, 2, 3] = sIdx = 0; i = 0; pidx =0
// [2, 4, 3] = sIdx = 0; i = 1; pidx = 1;
// [2, 3, 4] = sIdx = 0; i = 2; pidx = 2;
