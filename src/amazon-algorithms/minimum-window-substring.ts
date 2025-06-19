/**
 * Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.

If there is no such substring, return "".
 */

function minWindow(s: string, t: string): string {
  if (t.length < s.length) {
    return '';
  }

  const targetCount = new Map<string, number>();
  const windowCount = new Map<string, number>();

  // build targetCount
  for (const char of t) {
    targetCount.set(char, (targetCount.get(char) ?? 0) + 1);
  }

  let left = 0;
  let resultLen = Infinity;
  let have = 0;
  let result = [-1, -1];
  const need = targetCount.size;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    windowCount.set(char, (windowCount.get(char) ?? 0) + 1);

    if (
      targetCount.has(char) &&
      windowCount.get(char) === targetCount.get(char)
    ) {
      have++;
    }

    while (have === need) {
      // if the current window is less than the existing window
      if (right - left + 1 < resultLen) {
        result = [left, right];
        resultLen = right - left + 1;
      }

      // shrink the window from the left
      const leftChar = s[left];
      windowCount.set(leftChar, windowCount.get(leftChar)! - 1);

      if (targetCount.has(leftChar)) {
        targetCount.set(leftChar, targetCount.get(leftChar)! - 1);
        have--;
      }

      left++;
    }
  }

  const [start, end] = result;

  return resultLen === Infinity ? '' : s.substring(start, end + 1);
}

const testCases = [
  { s: "ADOBECODEBANC", t: "ABC", expected: "BANC" }, // classic
  { s: "a", t: "a", expected: "a" }, // same char
  { s: "a", t: "aa", expected: "" }, // not enough
  { s: "ab", t: "b", expected: "b" }, // end of s
  { s: "bba", t: "ab", expected: "ba" }, // reverse order
  { s: "abcdebdde", t: "bde", expected: "bdde" }, // not minimal on left
  { s: "aaaaaaabbbbbc", t: "abc", expected: "abbbbbc" }, // long b
  { s: "ab", t: "A", expected: "" }, // case-sensitive
  { s: "", t: "", expected: "" }, // both empty
  { s: "xyz", t: "xyz", expected: "xyz" }, // whole string is answer
];

for (const { s, t, expected } of testCases) {
  const result = minWindow(s, t);
  console.log(`minWindow("${s}", "${t}") = "${result}" // Expected: "${expected}"`);
}

export {};