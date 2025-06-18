type WeightedNode<V> = {
  node: V;
  weight: number;
};

class WeightedGraph<K extends string> {
  private adjencyList: Record<K, WeightedNode<K>[]>;

  constructor() {
    this.adjencyList = {} as Record<K, WeightedNode<K>[]>;
  }

  addVertex(v: K) { 
    if (this.adjencyList[v] === undefined) {
      this.adjencyList[v] = [];
    }

    return this;
  }

  addEdge(v1: K, v2: K, weight: number) {
    this.adjencyList[v1].push({ node: v2, weight });
    this.adjencyList[v2].push({ node: v1, weight });
  }
}
