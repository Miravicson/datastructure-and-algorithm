/**
 * Write a function `allConstruct(target, wordBank)` that accepts a `target` string and an array of strings `wordBank`
 *
 * The function should return a 2D array containing all the ways that the `target` can be constructed by concatenating elements from the `wordBank` array.
 */

function allConstructTab(target: string, wordBank: string[]): string[][] {
  const table: string[][][] = Array(target.length + 1)
    .fill(0)
    .map(() => []);

  table[0] = [[]];

  for (let i = 0; i <= target.length; i++) {
    for (const word of wordBank) {
      if (target.slice(i, i + word.length) === word) {
        const current = table[i];
        table[i + word.length] = table[i + word.length].concat(
          current.map((item) => [...item, word]),
        );
      }
    }
  }
  return table[target.length];
}

console.log(allConstructTab('purple', ['purp', 'p', 'ur', 'le', 'purpl'])); // [ [ 'purp', 'le' ], [ 'p', 'ur', 'p', 'le' ] ]

console.log(
  allConstructTab('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c']),
); /*
[
  [ 'ab', 'cd', 'ef' ],
  [ 'ab', 'c', 'def' ],
  [ 'abc', 'def' ],
  [ 'abcd', 'ef' ]
]

*/

console.log(
  allConstructTab('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']),
); // []

console.log(
  allConstructTab('enterapotentpot', [
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
  allConstructTab('aaaaaaaaaaaaaaaaaaaaaaaz', [
    'a',
    'aa',
    'aaa',
    'aaaa',
    'aaaaa',
  ]),
); //[]
