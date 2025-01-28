import { assertEqual, swap } from './utils';

function bubbleSort(arr: number[]): number[] {
  /// bubbles the maximum to the top at each pass
  for (let i = 0; i < arr.length; i++) {
    let noSwap = true;

    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        noSwap = false;
      }
    }
    if (noSwap) {
      break;
    }
  }

  return arr;
}

const successMessage = "Bubble sort passed ✅";
const failureMessage = "Bubble sort failed ❌";



assertEqual(bubbleSort([5, 2, 1]), [1, 2, 5], failureMessage);
assertEqual(bubbleSort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5], failureMessage);
console.log(successMessage)
