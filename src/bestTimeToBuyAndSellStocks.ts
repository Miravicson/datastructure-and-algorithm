/**
 * Given an aray of integers, each value at a position i represent    the price of the stock at day i.
 * Design an algorithm to find the maximum profi given that you're allowed only one transaction
 */

function tradeStockBF(arr: number[]): number {
  const n = arr.length;
  if (n < 2) {
    return 0;
  }

  let minIdx = 0;
  let min = arr[0];
  for (let i = 0; i < n; i++) {
    if (arr[i] < min) {
      min = arr[i];
      minIdx = i;
    }
  }

  let max = -Infinity;
  for (let i = minIdx; i < n; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max - min;
}

function tradeStock(arr: number[]): number {
  const n = arr.length;

  let maxProfit = 0;
  let l = 0;
  let r = 1;

  while (r <= n) {
    const profit = arr[r] - arr[l];
    if (profit > maxProfit) {
      maxProfit = profit;
    }
    if (arr[r] < arr[l]) {
      l = r;
    }
    r++;
  }

  return maxProfit;
}

console.log(tradeStockBF([7, 1, 5, 3, 6, 4])); // 5
console.log(tradeStockBF([7, 6, 4, 3, 1])); // 0
console.log(tradeStockBF([1, 2, 3, 4, 5])); // 4
console.log(tradeStock([7, 1, 5, 3, 6, 4])); // 5
console.log(tradeStock([7, 6, 4, 3, 1])); // 0
console.log(tradeStock([1, 2, 3, 4, 5])); // 4
console.log(tradeStock([100, 1, 2, 3, 4, 5])); // 4
console.log(tradeStock([])); // 0
