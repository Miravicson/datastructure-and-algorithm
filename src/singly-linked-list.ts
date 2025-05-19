
class CNode<T> {
  constructor(
    public val: T,
    public next: CNode<T> | null = null,
  ) {}
}

class LL<T> {
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

  insert(idx: number, val: T) {
    if (idx == 0) {
      return this.unshift(val);
    }

    if (idx == this.length - 1) {
      return this.push(val);
    }
    const preNode = this.get(idx - 1);

    if (preNode === null) {
      return this;
    }

    const newNode = new CNode(val);
    newNode.next = preNode.next;
    preNode.next = newNode;
    this.length++;
    return this;
  }

  set(idx: number, val: T): boolean {
    const optionalNode = this.get(idx);
    if (!optionalNode) {
      return false;
    }

    optionalNode.val = val;
    return true;
  }

  traverse() {
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
}

const ll = new LL();

ll.push(1).push(2).push(3).unshift(5);

console.log(ll.traverse());
ll.set(1, 2);
console.log(ll.traverse());
console.log(ll.tail);
ll.set(ll.length - 1, 20);
console.log(ll.traverse());
console.log(ll.tail);
console.log(ll.head);
