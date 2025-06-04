import { time } from "./method-decorator";

export class City {
  constructor(
    public name: string,
    public population: number,
  ) {}

  @time
  getSummary(): string {
    return `Name: ${this.name}, Population: ${this.population}`;
  }
}
