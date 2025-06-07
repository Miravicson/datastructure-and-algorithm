class CNode<T> {
  constructor(
    public val: T,
    public next: CNode<T> | null = null,
  ) {}
}

export class LinkedList<T> implements Iterable<T> {
  head: CNode<T> | null;
  tail: CNode<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  private isIndexOutOfRange(index: number): boolean {
    return !this.head || index < 0 || index >= this.length;
  }

  push(val: T) {
    const node = new CNode(val);

    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }

    this.length++;
    return this;
  }

  pop(): CNode<T> | null {
    if (!this.head) {
      return null;
    }

    let current = this.head;
    let newTail = this.head;
    while (current.next) {
      newTail = current;
      current = current.next;
    }

    newTail.next = null;
    this.tail = newTail;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  shift(): CNode<T> | null {
    if (!this.head) {
      return null;
    }
    const current = this.head;
    this.head = current.next;
    current.next = null;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }

    return current;
  }

  unshift(val: T) {
    const node = new CNode(val);
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.length++;
    return this;
  }

  get(index: number): CNode<T> | null {
    if (this.isIndexOutOfRange(index)) {
      return null;
    }

    let current = this.head!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    return current;
  }

  set(idx: number, val: T): boolean {
    const optionalNode = this.get(idx);
    if (!optionalNode) {
      return false;
    }

    optionalNode.val = val;
    return true;
  }

  insert(idx: number, val: T) {
    if (idx == 0) {
      this.unshift(val);
      return true;
    }

    if (idx === this.length) {
      this.push(val);
      return true;
    }
    const preNode = this.get(idx - 1);

    if (preNode === null) {
      return false;
    }

    const newNode = new CNode(val);
    newNode.next = preNode.next;
    preNode.next = newNode;
    this.length++;
    return true;
  }

  remove(idx: number): CNode<T> | null {
    if (idx === 0) {
      return this.shift();
    }

    if (idx === this.length - 1) {
      return this.pop();
    }

    const preNode = this.get(idx - 1);
    if (!preNode) {
      return null;
    }
    const node = preNode.next;
    preNode.next = node!.next;
    node!.next = null;

    this.length--;
    return node;
  }

  reverse() {
    if (!this.head) {
      return;
    }

    let node: CNode<T> | null = this.head;
    this.head = this.tail;
    this.tail = node;
    let prev: CNode<T> | null = null;
    let next: CNode<T> | null;

    for (let i = 0; i < this.length; i++) {
      next = node!.next;
      node!.next = prev;
      prev = node;
      node = next;
    }
  }

  *[Symbol.iterator](): Iterator<T> {
    let current: CNode<T> | null = this.head;
    for (let i = 0; i < this.length; i++) {
      yield current!.val;
      current = current!.next;
    }
  }

  traverseOld() {
    if (!this.head) {
      return `${this.constructor.name}:[empty]`;
    }

    let str = `${this.constructor.name}:[`;
    let curr: CNode<T> | null = this.head;
    while (curr) {
      str += `${curr.val}`;
      curr = curr.next;
      if (curr) {
        str += ` --> `;
      } else {
        str += `]`;
      }
    }
    return str;
  }

  traverse() {
    if (this.length === 0) {
      return `${this.constructor.name}:[empty]`;
    }
    let str = `${this.constructor.name}:[`;

    for (const item of this) {
      str += `${item} -> `;
    }
    str = str.slice(0, -4) + `]`;
    return str;
  }
}

const ll = new LinkedList();

// ll.push(1).push(2).push(3).unshift(5);
// console.log(ll.traverse());

// console.log(ll.remove(ll.length - 1));
// console.log(ll.traverse());
// console.log(ll.remove(1));
// console.log(ll.traverse());

// ll.push(2).push(3).push(4).push(1);
// console.log(ll.traverse());
// ll.reverse();
// console.log(ll.traverse());


