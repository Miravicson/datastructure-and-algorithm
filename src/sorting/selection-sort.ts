import { assertEqual, swap } from '../utils';

function selectionSort(arr: number[]): number[] {
  /// selects the minimum and inserts it at the beginning in each pass
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      swap(arr, minIdx, i);
    }
  }

  return arr;
}

const successMessage = 'Selection sort passed ✅';
const failureMessage = 'Selection sort failed ❌';

assertEqual(selectionSort([5, 2, 1]), [1, 2, 5], failureMessage);
assertEqual(selectionSort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5], failureMessage);
console.log(successMessage);
