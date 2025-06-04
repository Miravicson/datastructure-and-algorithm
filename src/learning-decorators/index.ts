import { Product } from './product';
import { City } from './city';
import { isSerializable } from './class-decorator';

const city = new City('Lonodon', 8_982_000);
const product = new Product('Kayak', 275);
console.log(city.getSummary());
console.log(product.getDetails());

console.log(`Get Product tax: ${product.tax}`);
product.tax = 30;
// (product as unknown as { serialize: () => string }).serialize();

if (isSerializable(product)) {
  product.serialize()
}
