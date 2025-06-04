export class City {
  constructor(public name: string, public population: number) {}
}

export class Product {
  constructor(
    public name: string,
    public price: number,
  ) {}
}

export class Person {
  constructor(
    public id: string,
    public name: string,
    public city: string,
  ) {}
}

export class Employee extends Person {
  constructor(
    public readonly id: string,
    public name: string,
    private dept: string,
    public city: string,
  ) {
    super(id, name, city);
  }

  writDept() {
    console.log(`${this.name} works in ${this.dept}`);
  }

  get location() {
    switch (this.city) {
      case 'Paris':
        return 'France';
      case 'London':
        return 'UK';
      default:
        return this.city;
    }
  }

  get details() {
    return `${this.name}, ${this.dept}, ${this.location}`;
  }

  @LogAccess()
  accessor salary: number = 100_000;
}

function LogAccess() {
  return function <T, V>(
    target: unknown,
    context: ClassAccessorDecoratorContext<T, V>,
  ) {
    const { name, metadata, kind } = context;
    return {
      get(this: T) {
        const value = 20;
        console.log(`Value from get: ${value}`);
        console.log(`This, name: ${String(name)}`);
        console.log('Metadata', metadata, 'Kind', kind, 'Target', target);
        return value;
      },
      set(this: T) {
        const value = 30;
        console.log(`Value from set: ${value}`);
        return value;
      },
    };
  };
}
