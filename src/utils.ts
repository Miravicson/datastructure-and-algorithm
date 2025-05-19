import assert from 'node:assert';

export function range(stop: number): number[];
export function range(start: number, stop: number): number[];
export function range(start: number, stop: number, step: number): number[];
export function range(start: number, stop?: number, step?: number) {
  let normStart = start;
  let normStop = stop;
  let normStep = step;

  if (normStop === undefined) {
    normStop = start;
    normStart = 0;
  }

  if (normStep === undefined) {
    normStep = 1;
  }
  const arrayLike = {
    length: Math.ceil((normStop - normStart) / normStep),
  };

  return Array.from(arrayLike, (_, i) => normStart + i * normStep);
}

/**
 * Get's the number of unique items in a sorted array
 * @param array sorted array
 * @returns the number of unique items in a sorted array
 */
export function countUnique<T extends string | number | boolean>(
  array: T[],
): number {
  let left = 0;
  let right = 0;
  let uniqueCount = 0;

  while (left < array.length) {
    if (array[left] !== array[right]) {
      uniqueCount++;
      left = right;
    }
    right++;
  }

  return uniqueCount;
}

export function countUnique2(array: unknown[]): number {
  if (!array.length) return 0;

  let left = 0;
  let right = 0;

  while (right < array.length) {
    if (array[left] !== array[right]) {
      left++;
      array.splice(left, 0, array[right]);
    }
    right++;
  }

  return left + 1;
}

/**
 * swaps, in-place, elements at indices i and j
 * @param arr array in which the swapping will be done in-place
 * @param i one of the indices
 * @param j the other indices
 */
export function swap<T>(arr: T[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * Compares the ith element of array a with the ith element of array b
 * and returns a true if the elements are equal for all values of i.
 * Otherwise, it returns false
 * @param a array a
 * @param b array b
 * @returns a boolean
 */
export function checkIfArrEqual<T extends any[]>(a: T, b: T): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = true;
  for (let i = 0; i < a.length; i++) {
    result &&= a[i] === b[i];
  }
  return result;
}

/**
 * Asserts that all elements in array a compares equally, in order and value, with elements in array b.
 * @param a array a
 * @param b array b
 * @param message [optional] assertion message to be displayed if assertion fails
 */
export function assertEqual<T extends any[]>(a: T, b: T, message = '') {
  assert(checkIfArrEqual(a, b), message);
}

/**
 * Asserts that at least one element in array a does not compare equal
 * to the corresponding ith position element in array b.
 * @param a array a
 * @param b array b
 * @param message message to be displayed if assertion fails
 */
export function assertNotEqual<T extends any[]>(a: T, b: T, message = '') {
  assert(!checkIfArrEqual(a, b), message);
}
