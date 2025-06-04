import { Person, City, Employee, Product } from './data-types';

// const salesEmployee = new Employee('fvega', 'Fidel Vega', 'Sales', 'Paris');

// salesEmployee.writDept();
// console.log(`Location: ${salesEmployee.location}`);
// console.log(`Details: ${salesEmployee.details}`);
// console.log(`Salary: ${salesEmployee.salary}`);

// console.log(['a', 'b', 'c'].reverse());
// console.log(['a', 'b', 'c'].toString());
// console.log(['a', 'b', 'c'].concat('d'));
// console.log(['a', 'b', 'c'].concat(['d', 'e']));

let products = [new Product('Running shoes', 100), new Product('Hat', 25)];
type ShapeType = { name: string };

class SetCollection<T extends ShapeType> {
  private items: Set<T>;

  constructor(initialItems: T[] = []) {
    this.items = new Set<T>(initialItems);
  }

  add(...newItems: T[]): void {
    newItems.forEach((newItem) => this.items.add(newItem));
  }

  get(name: string): T | undefined {
    return Array.from(this.items).find((item) => item.name === name);
  }

  get count(): number {
    return this.items.size;
  }
}

const productCollection: SetCollection<Product> = new SetCollection(products);
console.log(`There are ${productCollection.count} products`);
const p = productCollection.get('Hat');
console.log(`Product: ${p?.name}, ${p?.price}`);

class MapCollection<T extends ShapeType> {
  private items: Map<string, T>;

  constructor(initialItems: T[] = []) {
    this.items = new Map<string, T>();
    this.add(...initialItems);
  }

  add(...newItems: T[]): void {
    newItems.forEach((item) => this.items.set(item.name, item));
  }

  get(name: string): T | undefined {
    return this.items.get(name);
  }

  get count(): number {
    return this.items.size;
  }

  values(): Iterator<T> {
    return this.items.values();
  }
}

const productCollection2: MapCollection<Product> = new MapCollection(products);
console.log(`There are ${productCollection2.count} products`);

const iterator: Iterator<Product> = productCollection2.values();

let result: IteratorResult<Product> = iterator.next();
while (result.done != null && !result.done) {
  console.log(`Product: ${result.value.name}, ${result.value.price}`);
  result = iterator.next();
}

class IterableCollection<T extends ShapeType> {
  private items: Map<string, T>;

  constructor(initialItems: T[] = []) {
    this.items = new Map<string, T>();
    this.add(...initialItems);
  }

  add(...newItems: T[]): void {
    newItems.forEach((item) => this.items.set(item.name, item));
  }

  get(name: string): T | undefined {
    return this.items.get(name);
  }

  get count(): number {
    return this.items.size;
  }

  values(): IterableIterator<T> {
    return this.items.values();
  }
}

const productCollection3: IterableCollection<Product> = new IterableCollection(
  products,
);
console.log(`There are ${productCollection3.count} products`);
// We can use this format for iteration because of the `IterableIterator<T>` interface
Array.from(productCollection3.values()).forEach((p) =>
  console.log(`Product: ${p.name}, ${p.price}`),
);

// Also this idiom is enabled by the `IterableIterator<T>` interface
for (const product of productCollection3.values()) {
  console.log(`Product: ${product.name}, ${product.price}`);
}

class NativeIterableCollection<T extends ShapeType> implements Iterable<T> {
  private items: Map<string, T>;

  constructor(initialItems: T[] = []) {
    this.items = new Map<string, T>();
    this.add(...initialItems);
  }

  add(...newItems: T[]): void {
    newItems.forEach((item) => this.items.set(item.name, item));
  }

  get(name: string): T | undefined {
    return this.items.get(name);
  }

  get count(): number {
    return this.items.size;
  }

  [Symbol.iterator](): Iterator<T> {
    // Makes the class natively iterable
    return this.items.values();
  }
}

const productCollection4: NativeIterableCollection<Product> =
  new NativeIterableCollection(products);

console.log(`There are ${productCollection4.count} products`);
// [Symbol.iterator](): Iterator<T> obviates the need to define the `productCollection4.values()` method
Array.from(productCollection4).forEach((product) =>
  console.log(`Product: ${product.name}, ${product.price}`),
);

// Also we can omit the definition of the `productCollection4.values()` method in this idiom
for (const product of productCollection4) {
  console.log(`Product: ${product.name}, ${product.price}`);
}

function getValue<T, K extends keyof T>(item: T, key: K): T[K] {
  return item[key];
}

const product = new Product('Running shoes', 100);
console.log(getValue(product, 'name'));
console.log(getValue(product, 'price'));

const employee = new Employee('2335353', 'Victor', 'Accounting', 'Los Angeles');
console.log(getValue(employee, 'location'));
console.log(getValue(employee, 'salary'));

export class IndexTypeCollection<T, K extends keyof T> implements Iterable<T> {
  private items: Map<T[K], T>;
  constructor(
    initialItems: T[] = [],
    private propertyName: K,
  ) {
    this.items = new Map<T[K], T>();
    this.add(...initialItems);
  }

  add(...newItems: T[]): void {
    newItems.forEach((newItem) =>
      this.items.set(newItem[this.propertyName], newItem),
    );
  }

  get(key: T[K]): T | undefined {
    return this.items.get(key);
  }

  get count(): number {
    return this.items.size;
  }

  [Symbol.iterator](): Iterator<T> {
    return this.items.values();
  }
}

const productCollection5 = new IndexTypeCollection(products, 'name');
const itemKey = productCollection5.get('Hat');
console.log(`Item: ${itemKey?.name}, ${itemKey?.price}`);

const productCollection6 = new IndexTypeCollection(products, 'price');
const itemKey2 = productCollection6.get(100);
console.log(`Item: ${itemKey2?.name}, ${itemKey2?.price}`);

type TotalResultType<T extends boolean> = T extends true ? string : number;

class CondTypeCollection<T> {
  private items: T[];

  constructor(...initialItems: T[]) {
    this.items = initialItems;
  }

  total<P extends keyof T, U extends boolean>(
    propName: P,
    format: U,
  ): TotalResultType<U> {
    const totalValue = this.items.reduce((t, item) => {
      t += typeof item[propName] === 'number' ? item[propName] : 0;
      return t;
    }, 0);

    const result = (
      format ? `$${totalValue.toFixed()}` : totalValue
    ) as TotalResultType<U>;

    return result;
  }
}

const data = new CondTypeCollection(
  new Product('Kayak', 275),
  new Product('LifeJacket', 48.95),
);

const firstVal = data.total('price', true);
console.log(`Formatted value: ${firstVal}`);
const secondVal = data.total('price', false);
console.log(`Unformatted value: ${secondVal}`);

type Filter<T, U> = T extends U ? T : never;

function FilterArray<T, U>(
  data: T[],
  predicate: (item: unknown) => item is U,
): Filter<T, U>[] {
  return data.filter((item) => predicate(item)) as Filter<T, U>[];
}

const dataArray = [
  new Product('Kayak', 275),
  new Person('1', 'Bob', 'London'),
  new Product('LifeJacket', 27.5),
];

function isProduct(item: unknown): item is Product {
  return item instanceof Product;
}

function isPerson(item: unknown): item is Person {
  return item instanceof Person;
}

const filteredData = FilterArray(dataArray, isProduct);
const person = FilterArray(dataArray, isPerson); // the type is inferred to be Person[]

/////////////////
// Using conditional types with mapped type

type ChangeProps<T, U, V> = {
  [P in keyof T]: T[P] extends U ? V : T[P];
};

interface MyPerson {
  name: string;
  level: number;
}

type MyPersonWithLevelNumber = ChangeProps<MyPerson, number, string>; // equivalent to interface {name: string; level: string}

//////////
// Identifying properties of a specific type

type UnionofTypeNames<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
};

type PropertiesOfType<T, U> = UnionofTypeNames<T, U>[keyof T];

function total<T, P extends PropertiesOfType<T, number>>(
  data: T[],
  propName: P,
): number {
  return data.reduce((t, item) => (t += Number(item[propName])), 0);
}

products = [new Product('Kayak', 275), new Product('LifeJacket', 48.95)];
console.log(`Total: ${total(products, 'price')}`);

////////

// Using inferred types
type TargetKey<T> = T extends (infer U)[] ? keyof U : keyof T;

function getValue2<T, P extends TargetKey<T>>(data: T, prop: P): T[P] {
  if (Array.isArray(data)) {
    return data[0][prop];
  } else {
    return data[prop];
  }
}

products = [new Product('Kayak', 275), new Product('LifeJacket', 48.95)];
console.log(`Array value ${getValue2(products, 'price')}`);
console.log(`Single Total: ${getValue2(products[0], 'price')}`);

type Result<T> = T extends (...args: never) => infer R ? R : never; // manual version of ReturnType<T>

function processArray<T, F extends (arg: T) => unknown>(
  data: T[],
  func: F,
): ReturnType<F>[] {
  return data.map(func) as ReturnType<F>[];
}

type PriceFormatterResult<T extends boolean> = T extends true ? string : number;

type PriceFormater = <U extends boolean>(
  price: number,
  shouldFormat: U,
) => PriceFormatterResult<U>;

const selectName = (p: Product) => p.name;
const selectPrice = (p: Product) => p.price;
products = [new Product('Kayak', 275), new Product('LifeJacket', 48.95)];
const names = processArray(products, selectName); // type is string[]
const prices = processArray(products, selectPrice); // type is number[]
console.log(names, prices);

type AnyConstructor = new (...args: any[]) => unknown;

function makeObject<T extends AnyConstructor>(
  constructor: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  return new constructor(...args) as InstanceType<T>;
}

const prod = makeObject(Product, 'Kayak', 275);
const city = makeObject(City, 'London', 8136000);

console.log(prod, city);
