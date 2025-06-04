import { log } from '../accessor-decorator';
import { serialize } from './class-decorator';
import { double } from './field-decorator';
import { time } from './method-decorator';

@serialize
export class Product {
  @double
  private taxRate: number = 20;

  constructor(
    public name: string,
    public price: number,
  ) {}

  @time
  getDetails(): string {
    return `Name: ${this.name}, Price: $${this.price}`;
  }

  @time
  getPrice(): number {
    return this.price * (1 + this.taxRate / 100);
  }

  @log
  get tax() {
    return this.taxRate;
  }

  @log
  set tax(newValue: number) {
    this.taxRate = newValue;
  }
}
