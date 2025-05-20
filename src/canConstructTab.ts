/**
 * Write a function `canConstruct(target, wordBank)` that accepts a target string and an array of strings.
 * the function should return a boolean indicating whether or not the `target` can be constructed by concatenating elements of the `wordBank` array.
 *
 * You may reuse elements of `wordBank` as many times as needed.
 *
 */

function canConstruct(target: string, wordBank: string[]): boolean {
  const table: boolean[] = Array(target.length + 1).fill(false);
  table[0] = true;

  for (let i = 0; i <= target.length; i++) {
    if (table[i]) {
      for (let word of wordBank) {
        // if the word matches character starting at position i
        if (target.slice(i, i + word.length) === word) {
          table[i + word.length] = true;
        }
      }
    }
  }

  return table[target.length];
}

console.log(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // true
console.log(
  canConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']),
); // false
console.log(
  canConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']),
); // true

console.log(
  canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'e',
    'ee',
    'eee',
    'eeee',
    'eeeee',
    'eeeeee',
  ]),
); // false
