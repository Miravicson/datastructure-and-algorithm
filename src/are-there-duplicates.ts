/**
 * Implement a function called, areThereDuplicates which accepts a variable number of arguments, and checks whether there are any duplicates among the arguments passed in.
 */

// space complexity of O(n) and time complexity of O(n)
function areThereDuplicates1<T extends string | number | symbol>(
  ...items: T[]
): boolean {
  const set = new Set<T>();

  for (const item of items) {
    if (set.has(item)) return true;
    set.add(item);
  }

  return false;
}

console.log(areThereDuplicates1(1, 2, 3)); // false
console.log(areThereDuplicates1(1, 2, 2)); // true
console.log(areThereDuplicates1('a', 'b', 'c', 'a')); // true
