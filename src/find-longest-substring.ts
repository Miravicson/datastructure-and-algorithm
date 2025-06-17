/**
 * Write a function called findLongestSubstring, which accepts a string and returns the length of the longest substring with all distinct characters.
 */
function findLongestSubstring(inputStr: string): number {
  let left = 0;
  let right = 0;

  let maxLength = -Infinity;
  const record = new Map<string, number>();

  while (right < inputStr.length) {
    if (record.has(inputStr[right])) {
      left = record.get(inputStr[right])! + 1;
      right = left;
      record.clear();
      record.set(inputStr[left], left);
    }
    record.set(inputStr[right], right);
    maxLength = Math.max(maxLength, record.size);
    right++;
  }

  return maxLength === -Infinity ? 0 : maxLength;
}

function findLongestSubstring2(str: string) {
  let longest = 0;
  const seen = {} as Record<string, number>;
  let start = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (seen[char]) {
      start = Math.max(start, seen[char] + 1);
    }
    longest = Math.max(longest, i - start + 1);
    seen[char] = i;
  }
  return longest;
}

console.log(findLongestSubstring2('')); //0
console.log(findLongestSubstring2('rithmschool')); //7
console.log(findLongestSubstring2('thisisawesome')); // 6
console.log(findLongestSubstring2('thecatinthehat')); //7
console.log(findLongestSubstring2('bbbbb')); // 1
console.log(findLongestSubstring2('longestsubstring')); // 8
console.log(findLongestSubstring2('thisishowwedoit')); // 6




