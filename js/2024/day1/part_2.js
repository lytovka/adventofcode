import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2024, 1);

const lines = input.trim().split("\n");
const numbers = lines.map((line) => line.split(/\s+/g).map(Number));

const rightMap = new Map();

numbers.forEach((row) => {
  rightMap.set(row[1], (rightMap.get(row[1]) || 0) + 1);
});

let result = 0;
numbers.forEach((row) => {
  result += (rightMap.get(row[0]) || 0) * row[0];
});

console.log(rightMap, result);
