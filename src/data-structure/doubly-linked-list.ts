class DNode<T> {
  constructor(
    public val: T,
    public next: DNode<T> | null = null,
    public prev: DNode<T> | null = null,
  ) {}
}

class DoublyLinkedList<T> {
  head: DNode<T> | null;
  tail: DNode<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  private isIndexOutOfRange(index: number): boolean {
    return !this.head || index < 0 || index >= this.length;
  }

  private isCloseToEnd(index: number) {
    return index >= Math.floor(this.length / 2);
  }

  push(val: T): DoublyLinkedList<T> {
    const node = new DNode(val);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  pop(): DNode<T> | null {
    if (!this.head) {
      return null;
    }

    const node = this.tail;
    if (this.length === 1) {
      this.tail = null;
      this.head = null;
    } else {
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    }
    node!.prev = null;
    this.length--;
    return node;
  }

  shift(): DNode<T> | null {
    if (!this.head) {
      return null;
    }

    const node = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head!.prev = null;
    }

    node.next = null;
    this.length--;
    return node;
  }

  unshift(val: T): DoublyLinkedList<T> {
    const node = new DNode(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.length++;
    return this;
  }

  get(index: number): DNode<T> | null {
    if (this.isIndexOutOfRange(index)) {
      return null;
    }

    let node: DNode<T> | null;

    if (!this.isCloseToEnd(index)) {
      node = this.head;
      for (let i = 0; i < index; i++) {
        node = node!.next;
      }
    } else {
      node = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        node = node!.prev;
      }
    }

    return node;
  }

  set(index: number, val: T): boolean {
    const maybeNode = this.get(index);
    if (!maybeNode) return false;

    maybeNode.val = val;
    return true;
  }

  insert(idx: number, val: T): boolean {
    if (idx === 0) {
      this.unshift(val);
      return true;
    }

    if (idx === this.length) {
      this.push(val);
      return true;
    }

    const preNode = this.get(idx - 1);
    if (preNode == null) {
      return false;
    }

    const newNode = new DNode(val);
    newNode.next = preNode.next;
    preNode.next = newNode;
    newNode.prev = preNode;
    this.length++;
    return true;
  }

  remove(idx: number): DNode<T> | null {
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
    preNode.next!.prev = preNode;
    node!.next = null;
    node!.prev = null;

    this.length--;
    return node;
  }

  traverse() {
    if (!this.head) {
      return `${this.constructor.name}:[empty]`;
    }

    let str = `${this.constructor.name}:[`;
    let curr: DNode<T> | null = this.head;
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

const dd = new DoublyLinkedList<number>();

dd.push(20).push(40).push(80);
console.log(dd.traverse());
let node = dd.pop();
console.log(dd.traverse());
console.log(node);
dd.pop();
console.log(dd.traverse());
dd.pop();
console.log(dd.traverse());
dd.pop();
console.log(dd.traverse());

dd.push(1).push(2);
console.log(dd.traverse());
dd.shift();
console.log(dd.traverse());
dd.shift();
console.log(dd.traverse());
dd.unshift(1).unshift(2).unshift(5);
console.log(dd.traverse());
console.log(dd.get(0)?.val);
dd.set(3, 2);
console.log(dd.traverse());
dd.insert(1, 3);
console.log(dd.traverse());
node = dd.remove(0);
console.log(node, node?.next, node?.prev);
console.log(dd.traverse());
