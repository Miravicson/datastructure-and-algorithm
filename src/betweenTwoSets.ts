function lcmArray(arr: number[]): number {
  return arr.reduce((acc, curr) => lcm(acc, curr));
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function gcdArray(arr: number[]): number {
  return arr.reduce((acc, curr) => gcd(acc, curr));
}

console.log(lcmArray([2, 6]))
console.log(gcdArray([24, 36]))
console.log(lcm(6, 12))
console.log(gcd(6, 12))
