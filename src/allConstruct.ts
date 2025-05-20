/**
 * Write a function `allConstruct(targe, wordBank)` that accepts a target string and an array of strings.
 *
 * The function should return a 2D array containing all of the ways that `target` can be constructed by concatenating elements of the `wordBank` array.
 */

function allConstruct(
  target: string,
  wordBank: string[],
  memo: Record<string, string[][]> = {},
): string[][] {
  if (target in memo) {
    return memo[target];
  }
  if (target === '') {
    return [[]];
  }

  let result: string[][] = [];
  for (let word of wordBank) {
    if (target.startsWith(word)) {
      const suffix = target.slice(word.length);
      const suffixWays = allConstruct(suffix, wordBank);

      const targetWays = suffixWays.map((way) => {
        return [word, ...way];
      });
      result.push(...targetWays);
    }
  }

  memo[target] = result;
  return result;
}

console.log(allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])); // [ [ 'purp', 'le' ], [ 'p', 'ur', 'p', 'le' ] ]

console.log(
  allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c']),
); /*
[
  [ 'ab', 'cd', 'ef' ],
  [ 'ab', 'c', 'def' ],
  [ 'abc', 'def' ],
  [ 'abcd', 'ef' ]
]

*/

console.log(
  allConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']),
); // []

console.log(
  allConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']),
); // 4

console.log(
  allConstruct('aaaaaaaaaaaaaaaaaaaaaaaz', ['a', 'aa', 'aaa', 'aaaa', 'aaaaa']),
); //[]
