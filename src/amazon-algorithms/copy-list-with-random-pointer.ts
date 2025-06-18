/**
 * You are given a linked list of length n where each node contains:
 * 	•	An integer value val
 * 	•	A pointer next to the next node
 * 	•	A pointer random to any node in the list or null
 * Your task is to deep copy the list — return a new list where each node is a clone of the original, with the same val, next, and
 * random relationships, but no shared references.
 */

class Node {
  constructor(
    public value: number,
    public next: Node | null = null,
    public random: Node | null = null,
  ) {}
}

type InputList = [value: number, randIdx: number | null][];

function buildList(input: [value: number, random: number | null][]) {
  if (!input.length) return null;
  const nodes = input.map(([value]) => {
    return new Node(value);
  });

  input.forEach(([_, randomIdx], i) => {
    nodes[i].next = i + 1 < nodes.length ? nodes[i + 1] : null;
    nodes[i].random = randomIdx === null ? null : nodes[randomIdx];
  });

  return nodes[0];
}

function printList(head: Node | null) {
  const result = [] as [value: number, randomIdx: number | null][];
  const nodeIdxMap = new Map<Node, number>();

  // build map
  let curr: Node | null = head;
  let idx = 0;
  while (curr != null) {
    nodeIdxMap.set(curr, idx);
    idx++;
    curr = curr.next;
  }

  // buid result
  curr = head;
  while (curr != null) {
    const listNode: [value: number, randomIdx: null | number] = [
      curr.value,
      curr.random !== null ? nodeIdxMap.get(curr.random)! : null,
    ];
    result.push(listNode);
    curr = curr.next;
  }

  return result;
}

function solution2(head: Node | null): Node | null {
  if (!head) return null;

  // 1 Clone nodes and insert them after originals

  let curr: Node | null = head;
  while (curr) {
    const copy = new Node(curr.value, curr.next);
    const next: Node | null = curr.next;
    curr.next = copy;
    curr = next;
  }

  // 2. Set random pointers for cloned nodes
  curr = head;
  while (curr) {
    if (curr.random !== null) {
      curr.next!.random = curr.random.next;
    }

    curr = curr.next!.next;
  }

  // separate original and copied list
  curr = head;
  const copiedHead = head.next;
  while (curr) {
    const copy: Node = curr.next!;
    curr.next = copy.next;
    if (copy.next) {
      copy.next = copy.next.next;
    }
    curr = curr.next;
  }

  return copiedHead;
}

function solution(head: Node | null): Node | null {
  if (head === null) return null;

  // clone node and add them after originals
  let curr: Node | null = head;
  while (curr !== null) {
    const copy = new Node(curr.value, curr.next);
    const next: Node | null = curr.next;
    curr.next = copy;
    curr = next;
  }

  // set the random pointers for the copy

  curr = head;
  while (curr !== null) {
    if (curr.random) {
      curr.next!.random = curr.random.next;
    }
    curr = curr.next!.next;
  }

  // separate copy from original
  curr = head;
  const copiedHead = head.next;

  while (curr !== null) {
    const copy: Node = curr.next!;
    curr.next = copy.next;
    if (copy.next) {
      copy.next = copy.next.next;
    }

    curr = curr.next;
  }

  return copiedHead;
}

const testCases: InputList[] = [
  [], // Empty list
  [[1, null]], // Single node, no random
  [[1, 0]], // Single node, random to itself
  [
    [1, null],
    [2, 0],
  ], // Two nodes, random backward
  [
    [1, 1],
    [2, 0],
  ], // Two nodes, mutual randoms
  [
    [1, 2],
    [2, null],
    [3, 1],
  ], // Random zig-zag
  [
    [7, null],
    [13, 0],
    [11, 4],
    [10, 2],
    [1, 0],
  ], // Classic example
  [
    [1, null],
    [2, null],
    [3, null],
    [4, null],
    [5, null],
  ], // No randoms
  [
    [1, 4],
    [2, 3],
    [3, 2],
    [4, 1],
    [5, 0],
  ], // Fully reversed randoms
  [
    [1, null],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, null],
  ], // Some randoms are null, some self
];

testCases.forEach((test, i) => {
  const input = buildList(test);
  const output = solution(input);
  console.log(`Test #${i + 1}:`, printList(input), ' -> ', printList(output));
});

export {};
