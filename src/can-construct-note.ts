/**
 * Write a function called constructNote, which accepts two strings, a message and some letters. The functio nshould return true if the message can be built with the letters that you are given or it should return false.
 * Assume that there are only lowercase letters and no space or special characters in both the message and the letters
 */

function canConstructNote(message: string, letters: string): boolean {
  if (message === '' && letters === '') return true;

  if (letters === '') return false;

  const counter = new Counter(letters);

  for (const char of message) {
    const removeResult = counter.remove(char);
    if (removeResult === false) return false;
  }

  return true;
}

class Counter {
  data: Record<string, number> = {} as Record<string, number>;

  constructor(letters: string) {
    for (const char of letters) {
      this.add(char);
    }
  }

  add(element: string): number {
    this.data[element] = (this.data[element] ?? 0) + 1;
    return this.data[element];
  }

  remove(element: string): boolean {
    if (this.data[element] === undefined || this.data[element] === 0)
      return false;

    this.data[element] -= 1;
    return true;
  }
}

console.log(canConstructNote('aa', 'abc')); // false
console.log(canConstructNote('abc', 'dcba')); // true
console.log(canConstructNote('aabbc', 'bcabcaddff')); // true
