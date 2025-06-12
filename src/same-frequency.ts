/**
 * Write a function called sameFrequency, Given two positive integers, find out if the two numbers have the same frequency of digits. Your solution must be O(n)
 */

function numDigits(num: number): number {
  return Math.ceil(Math.log10(num));
}

function extractDigit(num: number, idx: number) {
  if (idx < 0 || idx >= numDigits(num)) throw new Error('invalid idx');
  return Math.floor(num / Math.pow(10, idx)) % 10;
}

function incrementItemCount<T extends Record<number, number>>(
  lookup: T,
  item: number,
): void {
  if (!lookup[item]) {
    lookup[item] = 1;
  } else {
    lookup[item]++;
  }
}

function decrementItemCount<T extends Record<number, number>>(
  lookup: T,
  item: number,
): boolean {
  if (!lookup[item]) return false;

  lookup[item] -= 1;
  return true;
}

function sameFrequency(num1: number, num2: number): boolean {
  if (numDigits(num1) !== numDigits(num2)) return false;

  const lookup: Record<number, number> = {};

  for (let i = 0; i < numDigits(num1); i++) {
    const digit = extractDigit(num1, i);
    incrementItemCount(lookup, digit);
  }

  for (let i = 0; i < numDigits(num2); i++) {
    const digit = extractDigit(num2, i);
    const didDecrement = decrementItemCount(lookup, digit);
    if (!didDecrement) {
      return false;
    }
  }

  return true;
}

console.log(sameFrequency(182, 281)); // true
console.log(sameFrequency(34, 14)); // false
console.log(sameFrequency(3589578, 5879385)); // true
console.log(sameFrequency(22, 222)); // true
