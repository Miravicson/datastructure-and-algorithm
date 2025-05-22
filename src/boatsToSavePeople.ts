/**
 * Given an array people and an integer limit people array is an array of people's weights, i-th person has a weight people[i] and each boat can carry
 * at most limit
 * Each both can carry at most 2 people at the same time, Given that their weight sum is at most limit
 */

function numBoats(weights: number[], limit: number): number {
  let boats = 0;
  weights.sort((a, b) => a - b);

  let l = 0;
  let r = weights.length - 1;
  while (r >= l) {
    if (weights[l] + weights[r] <= limit) {
      l++;
      r--;
    } else {
      r--;
    }
    boats++;
  }


  return boats;
}

console.log(numBoats([2, 4, 1, 3, 2], 4));
console.log(numBoats([2, 4, 1, 3, 3], 4));
