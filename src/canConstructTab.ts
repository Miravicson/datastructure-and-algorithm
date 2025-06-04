/**
 * Write a function `canConstructTab(target, wordBank)` that accepts a target string and an array of strings.
 * the function should return a boolean indicating whether or not the `target` can be constructed by concatenating elements of the `wordBank` array.
 *
 * You may reuse elements of `wordBank` as many times as needed.
 *
 */

function canConstructTab(target: string, wordBank: string[]): boolean {
  const table: boolean[] = Array(target.length + 1).fill(false);
  table[0] = true;

  for (let i = 0; i <= target.length; i++) {
    if (table[i]) {
      for (const word of wordBank) {
        // if the word matches character starting at position i
        if (target.slice(i, i + word.length) === word) {
          table[i + word.length] = true;
        }
      }
    }
  }

  return table[target.length];
}

console.log(canConstructTab('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // true
console.log(
  canConstructTab('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']),
); // false
console.log(
  canConstructTab('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']),
); // true

console.log(
  canConstructTab('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'e',
    'ee',
    'eee',
    'eeee',
    'eeeee',
    'eeeeee',
  ]),
); // false
