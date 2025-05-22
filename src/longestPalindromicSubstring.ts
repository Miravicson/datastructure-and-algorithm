/**
 * Given a string s, find the longest palindromic substring in s.
 *  a palindrome is a word that reads the same backwords.
 */

function solveRecur(
  word: string,
  memo: Record<string, string> = {},
): string {
  if (word in memo) {
    return memo[word];
  }
  if (isPalindrome(word)) {
    return word;
  }

  const leftPalindrome = solveRecur(word.slice(1), memo);
  const rightPalindrome = solveRecur(word.slice(0, -1), memo);

  if (leftPalindrome.length > rightPalindrome.length) {
    memo[word] = leftPalindrome;
    return leftPalindrome;
  } else {
    memo[word] = rightPalindrome;
    return rightPalindrome;
  }
}

function isPalindrome(
  word: string,
  memo: Record<string, boolean> = {},
): boolean {
  if (word in memo) {
    return memo[word];
  }
  if (word.length <= 1) {
    return true;
  }
  if (word[0] != word[word.length - 1]) {
    return false;
  }

  memo[word] = isPalindrome(word.slice(1, -1), memo);
  return memo[word];
}

function solve(s: string): string {
  let start = 0;
  let maxLength = 1;
  let n = s.length;

  const table = Array.from({ length: n }, () => Array(n).fill(false));
  for (let i = 0; i < n; i++) {
    table[i][i] = true;
  }

  for (let length = 2; length <= n; length++) {
    for (let i = 0; i <= n - length; i++) {
      const j = i + length - 1;
      if (s[i] === s[j]) {
        if (length === 2 || table[i + 1][j - 1]) {
          table[i][j] = true
          start = i;
          if (length > maxLength) {
            maxLength = length;
          }
        }
      }
    }
  }

  return s.slice(start, start + maxLength);
}

console.log(solve('babad')); // bab, aba
console.log(solve('cbbd')); // bb
console.log(solve('racecar')); // racecar
console.log(solve('abcdfgdcba')); // a
console.log(solve('abacdfgdcaba')); // aba
console.log(solve('abcddcbazzz')); // abcddcba
console.log(solve('racecar'));
