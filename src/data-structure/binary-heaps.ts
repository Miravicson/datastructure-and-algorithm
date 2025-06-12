/**
 * There are two kinds of binary heaps, max binary heap and a min binary heap
 * The siblings must be smaller than the parents in a max binary heap and the converse is true for the min binary heap.
 * Each parent must have at most 2 child.
 * The left child must be filled in before the right child
 *
 */

class MaxBinaryHeap<T> {
  values: T[] = [];

  private getParentIdx(childIdx: number): number {
    return Math.max(0, Math.floor((childIdx - 1) / 2));
  }

  private getChildIdx(parentIdx: number): [first: number, second: number] {
    return [2 * parentIdx + 1, 2 * parentIdx + 2];
  }

  private swapAt(idx1: number, idx2: number): void {
    [this.values[idx1], this.values[idx2]] = [
      this.values[idx2],
      this.values[idx1],
    ];
  }

  get size(): number {
    return this.values.length;
  }

  private bubbleUp() {
    let currIdx = this.size - 1;
    let parentIdx = this.getParentIdx(currIdx);
    while (this.values[parentIdx] < this.values[currIdx]) {
      this.swapAt(currIdx, parentIdx);
      [currIdx, parentIdx] = [parentIdx, this.getParentIdx(parentIdx)];
    }
  }

  private downHeap() {
    let currIdx = 0;
    let [firstChild, secondChild] = this.getChildIdx(currIdx);
    while (firstChild < this.size) {
      if (secondChild >= this.size) {
        if (this.values[currIdx] < this.values[firstChild]) {
          this.swapAt(currIdx, firstChild);
        }
        break;
      }

      const childIdxToSwap =
        this.values[firstChild] > this.values[secondChild]
          ? firstChild
          : secondChild;

      if (this.values[currIdx] >= this.values[childIdxToSwap]) {
        break;
      }

      this.swapAt(currIdx, childIdxToSwap);
      currIdx = childIdxToSwap;
      [firstChild, secondChild] = this.getChildIdx(currIdx);
    }
  }

  insert(val: T): MaxBinaryHeap<T> {
    this.values.push(val);
    this.bubbleUp();
    return this;
  }

  removeAtTop(): T | undefined {
    if (this.size === 0) return;
    this.swapAt(0, this.size - 1);
    const result = this.values.pop();
    this.downHeap();
    return result;
  }

  clear(): void {
    this.values = [];
  }

  dfsPreOrder() {
    const data: T[] = [];
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

const heap = new MaxBinaryHeap<number>();

heap.insert(10).insert(20).insert(5).insert(17).insert(9).insert(45).insert(1);
console.log(heap.dfsPreOrder());
const maxValue = heap.removeAtTop();
console.log(maxValue, heap.dfsPreOrder());
heap.clear();
console.log('heap is cleared', heap.dfsPreOrder());

heap.insert(20);
console.log(heap);
console.log(heap.removeAtTop(), heap.dfsPreOrder());
console.log(heap.removeAtTop(), heap.dfsPreOrder());
heap.clear();

heap.insert(1).insert(2).insert(3).insert(4).insert(5).insert(6);
console.log(heap.values);
