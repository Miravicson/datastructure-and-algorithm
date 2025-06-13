/**
 *  Write a function called isSubSequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string without their other changing;
 * @param target
 * @param hayStack
 */

function isSubSequence(target: string, hayStack: string) {
  let t = 0;
  let h = 0;

  while (h < hayStack.length) {
    if (hayStack[h] === target[t]) {
      t++;
    }

    h++;
  }

  return t === target.length;
}

console.log(isSubSequence('hello', 'hello world')); // true;
console.log(isSubSequence('sing', 'sting')); // true;
console.log(isSubSequence('abc', 'abracadabra')); // true;
console.log(isSubSequence('abc', 'acb')); // false;
