/**
 * A priority queue is a data structure where each element has a priority. Elements with higher priorities are served before elements with lower priorities
 */

class QueueNode<T> {
  constructor(
    public value: T,
    public priority: number,
  ) {}
}

class PriorityQueue<
  T,
  U extends { val: T; priority: number } = { val: T; priority: number },
> {
  values: QueueNode<T>[] = [];

  private getParentIdx(childIdx: number): number {
    return Math.max(0, Math.floor((childIdx - 1) / 2));
  }

  private getChildIdx(
    parentIdx: number,
  ): [firstIdx: number, secondIdx: number] {
    const firstIdx = 2 * parentIdx + 1;
    const secondIdx = firstIdx + 1;

    return [firstIdx, secondIdx];
  }

  private swapAt(idx1: number, idx2: number): void {
    [this.values[idx1], this.values[idx2]] = [
      this.values[idx2],
      this.values[idx1],
    ];
  }

  private bubbleUp() {
    let currIdx = this.size - 1;
    let parentIdx = this.getParentIdx(currIdx);
    while (this.values[currIdx].priority < this.values[parentIdx].priority) {
      this.swapAt(currIdx, parentIdx);
      [currIdx, parentIdx] = [parentIdx, this.getParentIdx(parentIdx)];
    }
  }

  private downHeap() {
    let currIdx = 0;
    let [firstIdx, secondIdx] = this.getChildIdx(currIdx);
    while (firstIdx < this.size) {
      if (secondIdx >= this.size) {
        if (this.values[currIdx].priority > this.values[firstIdx].priority) {
          this.swapAt(currIdx, firstIdx);
        }
        break;
      }

      const childIdxToSwap =
        this.values[firstIdx].priority < this.values[secondIdx].priority
          ? firstIdx
          : secondIdx;
      this.swapAt(currIdx, childIdxToSwap);
      currIdx = childIdxToSwap;
      [firstIdx, secondIdx] = this.getChildIdx(currIdx);
    }
  }

  get size(): number {
    return this.values.length;
  }

  enqueue(val: T, priority: number): PriorityQueue<T, U> {
    const node = new QueueNode<T>(val, priority);
    this.values.push(node);
    this.bubbleUp();
    return this;
  }

  dequeue(): T | undefined {
    if (this.values.length === 0) return;
    this.swapAt(0, this.size - 1);
    const result = this.values.pop();
    this.downHeap();
    return result?.value;
  }

  dfsPreOrder() {
    const data: QueueNode<T>[] = [];
    if (this.values.length === 0) {
      return data;
    }

    const traverse = (parentIdx: number) => {
      const [firstChild, secondChild] = this.getChildIdx(parentIdx);
      data.push(this.values[parentIdx]);
      if (firstChild < this.size && this.values[firstChild] !== null) {
        traverse(firstChild);
      }

      if (secondChild < this.size && this.values[secondChild] !== null) {
        traverse(secondChild);
      }
    };

    traverse(0);
    return data;
  }
}

const pQueue = new PriorityQueue<string>();
pQueue.enqueue('go out', 3).enqueue('walk dog', 2).enqueue('pay bill', 1);

console.log(pQueue.dfsPreOrder());
console.log(pQueue.dequeue(), pQueue.dfsPreOrder());
