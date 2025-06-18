/**
 * A stack is an abstract data structure that abides by the LIFO rule of accessing elements
 * Stacks are used to manage function
 * Undo and Redo is implemented using stack.
 * History objects in your browser.
 *
 */

import { LinkedList } from './singly-linked-list';

interface IStack<T> {
  get length(): number;
  push(val: T): IStack<T>;
  peek(): T | undefined;
  pop(): T | undefined;
  clear(): void;
  traverse?(): string;
}

class Stack<T> implements IStack<T> {
  top: number;
  private data: T[];

  constructor() {
    this.top = 0;
    this.data = [];
  }

  get length() {
    return this.top;
  }

  push(val: T): Stack<T> {
    this.data[this.top++] = val;
    return this;
  }

  peek(): T | undefined {
    if (this.top === 0) {
      return undefined;
    }
    return this.data[this.top - 1];
  }

  pop(): T | undefined {
    if (this.top === 0) {
      return undefined;
    }
    return this.data[--this.top];
  }

  clear() {
    this.data = [];
    this.top = 0;
  }

  traverse() {
    if (this.top === 0) {
      return `Stack: [empty]`;
    }
    let result = `Stack: top ->[`;
    for (let i = this.top - 1; i >= 0; i--) {
      result += `${this.data[i]}`;
      if (i - 1 >= 0) {
        result += ', ';
      }
    }
    result += '] <- bottom';

    return result;
  }
}

class Stack2<T> implements IStack<T> {
  // top: number;
  private data: LinkedList<T>;
  constructor() {
    // this.top = 0;
    this.data = new LinkedList<T>();
  }

  push(val: T) {
    this.data.unshift(val);
    return this;
  }

  pop() {
    const node = this.data.shift();
    return node?.val ?? undefined;
  }

  peek(): T | undefined {
    const node = this.data.head;
    return node?.val ?? undefined;
  }

  get length() {
    return this.data.length;
  }

  clear() {
    this.data = new LinkedList<T>();
  }

  traverse(): string {
    if (this.data.length === 0) return 'Stack: [empty]';
    let str = 'Stack: top ->[';
    for (const item of this.data) {
      str += `${item} --> `;
    }
    str = str.slice(0, -5) + ']';
    return str;
  }
}

class StackNode<T> {
  constructor(
    public value: T,
    public next: StackNode<T> | null = null,
  ) {}
}

export class Stack3<T> implements IStack<T> {
  first: StackNode<T> | null;
  last: StackNode<T> | null;
  length: number;
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  push(val: T): IStack<T> {
    const node = new StackNode<T>(val);

    if (this.length === 0) {
      this.first = node;
      this.last = node;
    } else {
      node.next = this.first;
      this.first = node;
    }
    this.length++;
    return this;
  }

  pop(): T | undefined {
    if (this.length === 0) {
      return undefined;
    }

    const poppedNode = this.first;
    this.first = this.first!.next;
    this.length--;
    if (this.length === 0) {
      this.first = null;
      this.last = null;
    }
    poppedNode!.next = null;
    return poppedNode!.value;
  }

  clear(): void {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  peek(): T | undefined {
    return this.first?.value ?? undefined;
  }

  isEmpty() {
    return this.length === 0;
  }

  *[Symbol.iterator](): Iterator<T> {
    let current = this.first;
    for (let i = 0; i < this.length; i++) {
      yield current!.value;
      current = current!.next;
    }
  }

  traverse(): string {
    if (this.length === 0) return 'Stack: [empty]';
    let str = 'Stack: top ->[';
    for (const item of this) {
      str += `${item} --> `;
    }
    str = str.slice(0, -5) + ']';
    return str;
  }
}

const s = new Stack3<number>();
s.push(3).push(4).push(5);
console.log(s.traverse());
console.log(s.length);
let result = s.pop();
result = s.pop();
console.log(s.traverse(), result);
console.log(s.peek())
console.log(s.traverse())
