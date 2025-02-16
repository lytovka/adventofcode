import { readInputFromFile } from "../../utils/readInputFromFile.js"

const input = readInputFromFile(2024, 1);

const lines = input.trim().split("\n");
const numbers = lines.map((line) => line.split(/\s+/g).map(Number));

const left = numbers.map((row) => row[0]).sort((a, b) => a - b);
const right = numbers.map((row) => row[1]).sort((a, b) => a - b);

const result = left.reduce((acc, left, i) => {
  return acc + Math.abs(left - right[i]);
}, 0);

console.log(result);
