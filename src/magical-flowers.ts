import assert from 'node:assert';

function transform(arr: number[]): number[] {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    arr[i] = sum;
  }
  return arr;
}

function normalizeOutput(input: number): number {
  return input % (Math.pow(10, 9) + 7);
}

/**
 * Returns the number of petals of the last flower after some nights. Each flower starts with 1 petal each. After each night
 * a flower will absorb the petals of the flower before it in addition to its own petal.
 * @param numberOfFlowers
 * @param numberOfNights
 * @returns the number of petals of the last flower after numberOfNights magical nights
 */
function getLastFlowerPetal(
  numberOfFlowers: number,
  numberOfNights: number,
): number {
  const flowers = Array.from({ length: numberOfFlowers }, () => 1);

  for (let i = 0; i < numberOfNights; i++) {
    transform(flowers);
  }

  const petalOfLastFlower = flowers[numberOfFlowers - 1];

  return normalizeOutput(petalOfLastFlower);
}

assert(getLastFlowerPetal(3, 4) === 15);
console.log(getLastFlowerPetal(2000, 40));
console.log(getLastFlowerPetal(4, 2));
