export class Product {
  constructor(
    public name: string,
    public price: number,
  ) {}

  getDetails(): string {
    return `Name: ${this.name}, Price: $${this.price}`;
  }
}
