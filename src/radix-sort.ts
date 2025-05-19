import assert from 'node:assert';

/**
 * Get's the digit from a number at specified position.
 * getDigit(12345, 0); // 5
 * getDigit(12345, 1); // 4
 * getDigit(12345, 2); // 3
 * getDigit(12345, 3); // 2
 * getDigit(12345, 4); // 1
 * getDigit(12345, 5); // 0
 * @param num the num we want to get it's digit
 * @param position the position of the digit. Position counts up from 0 from right (unit place) to left
 */
function getDigit(num: number, position: number): number {
  return Math.floor(Math.abs(num) / Math.pow(10, position)) % 10;
}

/**
 * Gets the number of digits in a number
 * @param num the number
 * @returns how many digits are in the number
 */
function digitCount(num: number): number {
  return num === 0 ? 1 : 1 + Math.floor(Math.log10(Math.abs(num)));
}

/**
 * A function that finds the number with the most digit and returns the value of the number of digits
 * @param arr array of numbers
 * @returns the value of the maximum digit count of numbers in the array
 */
function mostDigits2(arr: number[]): number {
  let max = 0;
  for (const num of arr) {
    max = Math.max(digitCount(num), max);
  }
  return max;
}

/**
 * A function that finds the number with the most digit and returns the value of the number of digits
 * @param arr array of numbers
 * @returns the value of the maximum digit count of numbers in the array
 */
function mostDigits(arr: number[]): number {
  return arr.reduce((max, num) => {
    return Math.max(max, digitCount(num));
  }, 0);
}

function radixSort(arr: number[]): number[] {
  // find the largest digit count of the numbers in the array
  const maxDigitCount = mostDigits(arr);

  for (let k = 0; k < maxDigitCount; k++) {
    // create a bucket that can hold numbers for digits 0 - 9
    const digitBuckets = Array.from({ length: 10 }, () => [] as number[]);

    // fill the buckets with number based on the digit obtained for each kth position
    arr.forEach((num) => {
      const digitAtPos = getDigit(num, k);
      digitBuckets[digitAtPos].push(num);
    });

    // replace the contents of arr with the contents of the flattened bucket
    digitBuckets.flat().forEach((val, idx) => {
      arr[idx] = val;
    });
  }

  return arr;
}

assert(getDigit(12345, 0) === 5);
assert(getDigit(12345, 1) === 4);
assert(getDigit(12345, 2) === 3);
assert(getDigit(12345, 3) === 2);
assert(getDigit(12345, 4) === 1);
assert(getDigit(12345, 5) === 0);
assert(getDigit(12345, 6) === 0);

assert(digitCount(23) === 2);
assert(digitCount(100) === 3);
assert(digitCount(5) === 1);
assert(digitCount(0) === 1, 'wrong digit count');

assert(mostDigits([1, 23, 456]) === 3);
assert(mostDigits([1, 456]) === 3);
assert(mostDigits([1, 22, 24]) === 2);
assert(mostDigits([1]) === 1);

console.log(radixSort([1000, 5, 1, 3, 456, 23, -5]));

console.log('Test passed');
