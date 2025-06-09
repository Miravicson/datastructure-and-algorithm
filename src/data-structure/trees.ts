/**
 * Trees are hierarchical structures that are non-linear. It has a root node and one or more branch.
 * There is a parent-child relationship
 * There is only one root (the entry point)
 * You can see a linked-list as a special form of a tree.
 * Terminology
 *  1. Root -> the top node in a tree
 *  2. Child -> a node directly connected to another node when moving away from the root.
 *  3. Parent -> the converse of a child node
 *  4. Siblings -> a group of nodes that share the same parent.
 *  5. Leaf -> A node with no children
 *  6. Edge -> The connection between a parent node and a child node.
 *
 *  Application of trees
 *  . The HTML DOM
 *  . The network routing
 *  . Abstract syntax tree
 *  . Used in AI
 *  . Used to model folders and files in filesystem
 *  . JSON is modelled as trees.
 */

export class BSTNode<T> {
  constructor(
    public value: T,
    public left: BSTNode<T> | null = null,
    public right: BSTNode<T> | null = null,
  ) {}
}

export interface IBST<T> {
  insert(val: T): void;
  find(val: T): BSTNode<T> | null;
  root: BSTNode<T> | null;
}

export class BinarySearchTree<T> implements IBST<T> {
  constructor(public root: BSTNode<T> | null = null) {}

  insert(val: T): BinarySearchTree<T> {
    this.root = this.insertRec(val, this.root);
    return this;
  }
  insertV2(val: T): BinarySearchTree<T> {
    const newNode = new BSTNode<T>(val);

    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (val < current.value) {
        if (current.left == null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.value) {
        if (current.right == null) {
          current.right = newNode;
          return this;
        }

        current = current.right;
      } else {
        return this;
      }
    }
  }

  private insertRec(val: T, node: BSTNode<T> | null): BSTNode<T> {
    if (node === null) return new BSTNode(val);
    if (val < node.value) {
      node!.left = this.insertRec(val, node.left);
    } else if (val > node.value) {
      node.right = this.insertRec(val, node.right);
    } else {
      node.value = val;
    }

    return node;
  }

  find(val: T): BSTNode<T> | null {
    if (this.root === null) {
      return null;
    }

    let found = null;
    let current: BSTNode<T> | null = this.root;
    while (current && found === null) {
      if (val === current.value) {
        found = current;
      } else if (val < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return found;
  }

  contains(val: T): boolean {
    return this.find(val) !== null ? true : false;
  }
}

const tree2 = new BinarySearchTree<number>();
tree2.insert(1).insert(2).insert(-4).insert(1);
console.log(tree2);
console.log(tree2.find(1));
console.log(tree2.contains(1));
