/**
 * Implementing a graph using an adjency list
 *
 */

import { Queue } from './queue';
import { Stack3 } from './stack';

class Graph<K extends string> {
  adjencyList: Record<K, K[]>;
  constructor() {
    this.adjencyList = {} as Record<K, K[]>;
  }

  addVertext(vertex: K): Graph<K> {
    if (!(vertex in this.adjencyList)) {
      this.adjencyList[vertex] = [];
    }

    return this;
  }

  addEdge(vertex1: K, vertex2: K): Graph<K> {
    this.adjencyList[vertex1].push(vertex2);
    this.adjencyList[vertex2].push(vertex1);

    return this;
  }

  removeEdge(vertex1: K, vertex2: K): Graph<K> {
    this.adjencyList[vertex1] = this.adjencyList[vertex1].filter(
      (item) => item !== vertex2,
    );
    this.adjencyList[vertex2] = this.adjencyList[vertex2].filter(
      (item) => item !== vertex1,
    );

    return this;
  }

  removeVertex(vertex: K): Graph<K> {
    const vertexConnections = this.adjencyList[vertex];
    vertexConnections.forEach((conn) => {
      this.removeEdge(vertex, conn);
    });

    delete this.adjencyList[vertex];

    return this;
  }

  dfsRecursive(vertex: K): K[] {
    const result = [] as K[];

    const visited = {} as Record<K, boolean>;

    const traverse = (vertex: K) => {
      if (this.adjencyList[vertex].length === 0) {
        return;
      }
      result.push(vertex);
      visited[vertex] = true;
      this.adjencyList[vertex].forEach((neighbor) => {
        if (!(neighbor in visited)) {
          traverse(neighbor);
        }
      });
    };

    traverse(vertex);

    return result;
  }

  dfsIterative(start: K): K[] {
    const stack = new Stack3<K>();
    const visited = {} as Record<K, boolean>;
    stack.push(start);
    const result = [] as K[];
    while (!stack.isEmpty()) {
      const vertext = stack.pop()!;
      if (!(vertext in visited)) {
        visited[vertext] = true;
        result.push(vertext);
        this.adjencyList[vertext].forEach((neighbours) => {
          stack.push(neighbours);
        });
      }
    }

    return result;
  }

  bfs(start: K): K[] {
    const result = [] as K[];
    const visited = {} as Record<K, boolean>;
    const queue = new Queue<K>();
    queue.enqueue(start);

    while (!queue.isEmpty()) {
      const vertext = queue.dequeue()!;
      if (!(vertext in visited)) {
        visited[vertext] = true;
        result.push(vertext);
        this.adjencyList[vertext].forEach((neighbour) => {
          queue.enqueue(neighbour);
        });
      }
    }

    return result;
  }
}

const g = new Graph();
g.addVertext('A')
  .addVertext('B')
  .addVertext('C')
  .addVertext('D')
  .addVertext('E')
  .addVertext('F')
  .addEdge('A', 'B')
  .addEdge('A', 'C')
  .addEdge('B', 'D')
  .addEdge('C', 'E')
  .addEdge('D', 'E')
  .addEdge('D', 'F')
  .addEdge('E', 'F');

console.log(g);
console.log(g.dfsRecursive('A'));
console.log(g.dfsIterative('A'));
console.log(g.bfs('A'));
