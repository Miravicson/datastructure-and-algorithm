/**
 * This is a key-value data structure.
 */

class HashTable<K extends string, V> {
  keyMap: [key: K, value: V][][];
  constructor(private size: number = 51) {
    this.keyMap = Array.from(
      { length: size },
      () => [] as [key: K, value: V][],
    ) as [key: K, value: V][][];
  }

  private hash(key: K) {
    let total = 0;
    const hashPrimeNumber = 31;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[0];
      const value = Math.abs(char.charCodeAt(0) - 96);

      total = (total * hashPrimeNumber + value) % this.size;
    }

    return total;
  }

  get(key: K): V | undefined {
    const hashedKey = this.hash(key);

    const bucket = this.keyMap[hashedKey];
    const bucketValue = bucket.find(([innerKey]) => innerKey === key);

    if (bucketValue) {
      return bucketValue[1];
    }

    return undefined;
  }

  set(key: K, value: V) {
    const hashedKey = this.hash(key);
    const bucket = this.keyMap[hashedKey]!;
    const existingIndex = bucket.findIndex(([innerKey]) => innerKey === key);

    if (existingIndex === -1) {
      bucket.push([key, value]);
    } else {
      bucket[existingIndex] = [key, value];
    }
  }

  keys(): K[] {
    const result = [] as K[];
    this.keyMap.forEach((bucket) => {
      bucket.forEach(([key]) => result.push(key));
    });

    return result;
  }

  values(): V[] {
    const result = [] as V[];
    this.keyMap.forEach((bucket) => {
      bucket.forEach(([, value]) => result.push(value));
    });

    return result;
  }
}

const ht = new HashTable<string, string>();

console.log(ht.get('1'));
ht.set('mannequin', 'for hanging clothes');
console.log(ht.get('mannequin'));
console.log(ht.keys());
console.log(ht.values());
