/**
 * Write a function `canConstruct(targe, wordBank)` that accepts a target string and an array of strings.
 * The function should return a boolean indicationg wether or not the `target` can be constructed by concatenating elements or the `wordBank` array.
 * You may reuse elements of the wordBank as many times as needed
 */

function canConstruct(
  target: string,
  wordBank: string[],
  memo: Record<string, boolean> = {},
): boolean {
  if (target in memo) {
    return memo[target];
  }
  if (target === '') {
    return true;
  }

  for (let word of wordBank) {
    if (target.startsWith(word)) {
      const suffix = target.slice(word.length);
      const result = canConstruct(suffix, wordBank, memo);
      if (result) {
        memo[target] = true;
        return true;
      }
    }
  }

  memo[target] = false;
  return false;
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
