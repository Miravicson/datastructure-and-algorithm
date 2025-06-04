// import { readFile } from "node:fs/promises";
import { readFileSync } from 'node:fs';

const movies = readFileSync('./films.txt', {
  encoding: 'utf-8',
}).split('\n');

console.log(movies);
