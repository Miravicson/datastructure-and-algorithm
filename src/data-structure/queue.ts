/**
 * A Queue is a First-In-First-Out datastructure.
 */

class QueueNode<T> {
  constructor(
    public value: T,
    public next: QueueNode<T> | null = null,
  ) {}
}

interface IQueue<T> {
  size: number;
  dequeue(): T | undefined;
  enqueue(val: T): IQueue<T>;
  traverse?(): string;
}

interface Stringify<T> {
  (val: T): string;
}

export class Queue<T> implements IQueue<T>, Iterable<T> {
  first: QueueNode<T> | null;
  last: QueueNode<T> | null;
  size: number;

  constructor(public stringify: Stringify<T> = (val: T) => `${val}`) {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  dequeue(): T | undefined {
    if (this.size === 0) {
      return undefined;
    }

    const node = this.first;

    if (this.size === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first!.next;
    }
    node!.next = null;
    this.size--;
    return node!.value;
  }

  enqueue(val: T): IQueue<T> {
    const node = new QueueNode<T>(val);
    if (this.size === 0) {
      this.first = node;
      this.last = node;
    } else {
      this.last!.next = node;
      this.last = node;
    }
    this.size++;
    return this;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  *[Symbol.iterator](): Iterator<T> {
    let current = this.first;

    for (let i = 0; i < this.size; i++) {
      yield current!.value;
      current = current!.next;
    }
  }

  traverse(): string {
    if (this.size === 0) {
      return `Queue: [empty]`;
    }

    let result = `Queue: front ->[`;

    for (const item of this) {
      result += `${this.stringify(item)} -> `;
    }

    result = result.slice(0, -3) + ']';

    return result;
  }
}

interface Person {
  name: string;
  age: number;
}

const vic: Person = {
  name: 'Victor',
  age: 30,
};

const ada: Person = {
  name: 'Ada',
  age: 26,
};

const stringifyPerson: Stringify<Person> = (p) => `Person{${p.name}, ${p.age}}`;

let q = new Queue<Person>(stringifyPerson);
q.enqueue(vic).enqueue(ada);

console.log(q.traverse());
let result = q.dequeue();
if (result) console.log(`Popped`, stringifyPerson(result));
console.log(q.traverse())
result = q.dequeue()
if (result) console.log(`Popped`, stringifyPerson(result));
console.log(q.traverse())


