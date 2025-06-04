/**
 * Write a function `countConstruct(target, wordBank)` that accepts a target string and an array of strings
 *  the function should return the number of ways that the target can be created by concatenating elements of wordBank array.
 *
 * You may reuse elements of word bank as many times as you want
 */

function countConstructTab(target: string, wordBank: string[]): number {
  const table = Array(target.length + 1).fill(0);
  table[0] = 1;
  for (let i = 0; i <= target.length; i++) {
    for (const word of wordBank) {
      // if the word matches character starting at position i
      if (target.slice(i, i + word.length) === word) {
        table[i + word.length] += table[i];
      }
    }
  }

  return table[target.length];
}

console.log(countConstructTab('purple', ['purp', 'p', 'ur', 'le', 'purpl'])); // 2
console.log(countConstructTab('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // 1
console.log(
  countConstructTab('skateboard', [
    'bo',
    'rd',
    'ate',
    't',
    'ska',
    'sk',
    'boar',
  ]),
); // 0
console.log(
  countConstructTab('enterapotentpot', [
    'a',
    'p',
    'ent',
    'enter',
    'ot',
    'o',
    't',
  ]),
); // 4

console.log(
  countConstructTab('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'e',
    'ee',
    'eee',
    'eeee',
    'eeeee',
    'eeeeee',
  ]),
); // 0
