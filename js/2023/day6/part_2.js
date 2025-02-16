import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2023, 6);

const [time, distance] = input
  .trim()
  .split("\n")
  .map((line) => line.match(/\d+/g).reduce((acc, number) => acc + number));

console.log(time, distance);

let square = Math.sqrt(time ** 2 - 4 * distance);
let lowest = Math.ceil((-time - square) / 2);
let highest = Math.floor((-time + square) / 2);

console.log(highest - lowest + 1);
