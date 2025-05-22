/**
 * Given n non-negative integers where each integer represents the height of a vertical line on a chart
 * Find two lines, which together with the x-axis forms a container that holds the biggest amount of water.
 * Return the area of that water.
 */

function containerWithMostWater(n: number[]): number {
  let area = 0;

  let start = 0;
  let end = n.length - 1;

  while (start < end) {
    const tempArea = computeArea(n, start, end);
    if (tempArea > area) {
      area = tempArea;
    }
    if (n[start] < n[end]) {
      start++;
    } else {
      end--;
    }
  }

  return area;
}

function computeArea(a: number[], i: number, j: number) {
  const [l1, l2] = [a[i], a[j]];
  const effL = Math.min(l1, l2);
  const d = Math.abs(i - j);

  return effL * d;
}

console.log(containerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log(containerWithMostWater([1, 1])); // 1
console.log(containerWithMostWater([1, 2, 3, 4, 5])); // 6
console.log(containerWithMostWater([5, 5, 5, 5, 5])); // 20
console.log(containerWithMostWater([1, 3, 2, 5, 25, 24, 5])); // 24
console.log(containerWithMostWater([0, 2, 0, 4, 0, 3, 0])); // 8
console.log(containerWithMostWater([0, 0, 0, 0, 0])); // 0
