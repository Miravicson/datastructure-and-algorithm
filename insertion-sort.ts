import { assertEqual, swap } from "./utils";

function insertionSort(arr: number[]): number[] {
  /// good for sorting streamed data
  /// picks and element and sort of bubbles it towards the bottom until no other element is less than the chosen element
  for (let i = 1; i < arr.length; i++) {

    for (let k = i; k >= 1; k--) {
      if (arr[k] < arr[k - 1] ) {
        swap(arr, k, k - 1)
      }
    }
  }

  return arr;
}

const successMessage = "Insertion sort passed ✅";
const failureMessage = "Insertion sort failed ❌";



assertEqual(insertionSort([5, 2, 1]), [1, 2, 5], failureMessage);
assertEqual(insertionSort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5], failureMessage);
console.log(successMessage)