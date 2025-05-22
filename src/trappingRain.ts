/**
 * Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining
 */

function trappingRainWater(elevations: number[]): number {
  let volume = 0;

  const maxLeftHeights = Array(elevations.length).fill(0);
  maxLeftHeights[0] = elevations[0];
  const maxRightHeights = Array(elevations.length).fill(0);
  maxRightHeights[elevations.length - 1] = elevations[elevations.length - 1];

  for (let i = 1; i < elevations.length; i++) {
    maxLeftHeights[i] = Math.max(maxLeftHeights[i - 1], elevations[i]);
  }
  for (let i = elevations.length - 2; i >= 0; i--) {
    maxRightHeights[i] = Math.max(maxRightHeights[i + 1], elevations[i]);
  }

  for (let i = 0; i < elevations.length; i++) {
    volume += Math.min(maxLeftHeights[i], maxRightHeights[i]) - elevations[i];
  }

  return volume;
}

console.log(trappingRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); //6
console.log(trappingRainWater([1, 1, 1, 1, 1])); //0
console.log(trappingRainWater([1, 2, 3, 4, 5])); //0
console.log(trappingRainWater([5, 4, 3, 2, 1])); //0
console.log(trappingRainWater([5, 2, 1, 2, 1, 5])); // 14
console.log(trappingRainWater([0,3,0,2,0,4])); // 7
