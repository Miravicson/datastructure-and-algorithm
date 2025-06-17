import { BinarySearchTree, IBST } from './trees';

interface IQueue<T> {
  enqueue(val: T): void;
  dequeue(): T | undefined;
  size: number;
  isEmpty(): boolean;
}

interface IStack<T> {
  push(val: T): IStack<T>;
  pop(): T | undefined;
  size: number;
  isEmpty(): boolean;
}

interface INode<T> {
  value: T;
  left: INode<T> | null;
  right: INode<T> | null;
}

class MyQueue<T> implements IQueue<T> {
  private data: T[] = [];

  get size() {
    return this.data.length;
  }

  enqueue(val: T): MyQueue<T> {
    this.data.push(val);
    return this;
  }

  dequeue() {
    if (this.size === 0) {
      return undefined;
    }
    return this.data.shift();
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}

class Stack<T> implements IStack<T> {
  dataStore: T[] = [];

  get size() {
    return this.dataStore.length;
  }

  push(val: T): Stack<T> {
    this.dataStore.push(val);
    return this;
  }

  pop(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.dataStore.pop();
  }

  peek(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.dataStore[this.size - 1];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}

interface Store<T> {
  add(val: INode<T>): void;
  remove(): INode<T> | undefined;
  isEmpty(): boolean;
}

class QueueStoreAdapter<T> implements Store<T> {
  constructor(private store: IQueue<INode<T>>) {}

  add(val: INode<T>): void {
    this.store.enqueue(val);
  }

  remove(): INode<T> | undefined {
    return this.store.dequeue();
  }
  isEmpty(): boolean {
    return this.store.isEmpty();
  }
}

class StackQueueStoreAdapter<T> implements Store<T> {
  constructor(private store: IStack<INode<T>>) {}

  add(val: INode<T>): void {
    this.store.push(val);
  }

  remove(): INode<T> | undefined {
    return this.store.pop();
  }

  isEmpty(): boolean {
    return this.store.isEmpty();
  }
}

export class TreeSearch {
  static search<T>(store: Store<T>): T[] {
    const visited: T[] = [];

    while (!store.isEmpty()) {
      const node = store.remove();
      if (node != null) {
        visited.push(node!.value);
        if (node.right) store.add(node.right);
        if (node.left) store.add(node.left);
      } else {
        break;
      }
    }

    return visited;
  }
  static dfs<T>(tree: IBST<T>): T[] {
    if (tree.root === null) return [];
    const stack = new Stack<INode<T>>();
    stack.push(tree.root);
    const store = new StackQueueStoreAdapter(stack);
    return TreeSearch.search(store);
  }

  static bfs<T>(tree: IBST<T>): T[] {
    if (tree.root === null) return [];
    const queue = new MyQueue<INode<T>>();
    queue.enqueue(tree.root);
    const store = new QueueStoreAdapter(queue);
    return TreeSearch.search(store);
  }

  static dfsPreOrder<T>(tree: IBST<T>): T[] {
    const data: T[] = [];
    function traverse(node: INode<T>) {
      data.push(node.value);
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
    }

    if (tree.root === null) {
      return data;
    }

    traverse(tree.root);

    return data;
  }

  static dfsInOrder<T>(tree: IBST<T>): T[] {
    const data: T[] = [];
    function traverse(node: INode<T>) {
      if (node.left) {
        traverse(node.left);
      }
      data.push(node.value);
      if (node.right) {
        traverse(node.right);
      }
    }

    if (tree.root === null) {
      return data;
    }

    traverse(tree.root);
    return data;
  }

  static dfsPostOrder<T>(tree: IBST<T>): T[] {
    const data: T[] = [];
    function traverse(node: INode<T>) {
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
      data.push(node.value);
    }

    if (tree.root === null) {
      return data;
    }

    traverse(tree.root);
    return data;
  }
}

const tree = new BinarySearchTree<number>();

tree.insert(10).insert(6).insert(15).insert(3).insert(8).insert(20);

console.log(TreeSearch.bfs(tree));
console.log(TreeSearch.dfs(tree));
console.log('Preorder', TreeSearch.dfsPreOrder(tree));
console.log('In order', TreeSearch.dfsInOrder(tree));
console.log('Post order', TreeSearch.dfsPostOrder(tree));
