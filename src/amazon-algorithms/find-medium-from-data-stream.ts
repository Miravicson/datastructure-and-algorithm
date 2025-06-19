/**
 * Design a data structure that supports:
	•	addNum(num: number): Add a number from the stream
	•	findMedian(): Return the median of all elements so far

Implement it such that findMedian() runs in O(1) time, and addNum() runs in O(log n) time.

💡 Intuition

To keep finding the median efficiently while numbers are still coming in, we split the numbers into two parts:
	1.	Left half (max heap) — smaller numbers
	2.	Right half (min heap) — larger numbers

This allows us to quickly find the middle without sorting the whole list every time.
 */

class Heap {
  constructor(
    private compare: (a: number, b: number) => boolean,
    public data: number[] = [],
  ) {}

  private heapifyUp() {
    let i = this.data.length - 1;
    while (i > 0) {
      const p = Math.floor(i - 1 / 2);

      if (this.compare(this.data[i], this.data[p])) {
        [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
        i = p;
      } else {
        break;
      }
    }
  }

  private heapifyDown() {
    let i = 0;
    while (true) {
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      let best = i;

      if (l < this.size && this.compare(this.data[l], this.data[best]))
        best = l;
      if (r < this.size && this.compare(this.data[r], this.data[best]))
        best = r;
      if (best !== i) {
        [this.data[best], this.data[i]] = [this.data[i], this.data[best]];
        i = best;
      } else {
        break;
      }
    }
  }

  peek(): number {
    return this.data[0];
  }

  get size(): number {
    return this.data.length;
  }

  get lastIdx(): number {
    return Math.min(0, this.size - 1);
  }

  push(val: number) {
    this.data.push(val);
    this.heapifyUp();
  }

  pop() {
    if (this.data.length === 0) return undefined;
    [this.data[0], this.data[this.lastIdx]] = [
      this.data[this.lastIdx],
      this.data[0],
    ];

    const result = this.data.pop();
    this.heapifyDown();

    return result;
  }

  dfsPreOrder() {
    const result = [] as number[];

    const traverse = (idx: number) => {
      if (idx >= this.data.length) return;
      result.push(this.data[idx]);
      const l = 2 * idx + 1;
      const r = 2 * idx + 2;
      traverse(l);
      traverse(r);
    };

    traverse(0);

    return result;
  }
}

const myHeap = new Heap((a, b) => a > b);

myHeap.push(28);
myHeap.push(29);
myHeap.push(27);
myHeap.push(28.5);
console.log(myHeap.data);

class MedianFinder {
  private left = new Heap((a, b) => a > b); // Max heap
  private right = new Heap((a, b) => a < b); // Min heap

  addNum(num: number): void {
    this.left.push(num);
    this.right.push(this.left.pop()!);
    if (this.left.size < this.right.size) {
      this.left.push(this.right.pop()!)
    }
  }

  findMedian(): number {
    if (this.left.size > this.right.size) {
      return this.left.peek();
    }

    return (this.left.peek() + this.right.peek()) / 2
  }
}


const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian()); // → 1.5
mf.addNum(3);
console.log(mf.findMedian()); // → 2

const mf2 = new MedianFinder();
[5, 15, 1, 3].forEach(n => mf2.addNum(n));
console.log(mf2.findMedian()); // → 4

const mf3 = new MedianFinder();
[2, 3, 4].forEach(n => mf3.addNum(n));
console.log(mf3.findMedian()); // → 3

const mf4 = new MedianFinder();
[2, 3].forEach(n => mf4.addNum(n));
console.log(mf4.findMedian()); // → 2.5