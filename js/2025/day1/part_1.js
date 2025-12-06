import { readInputFromFile } from "../../utils/misc.js";

const input = readInputFromFile(2025, 1);

const directions = input
  .trim()
  .split("\n")
  .map((line) => ({ direction: line[0], step: parseInt(line.slice(1)) }));

let pos = 50;
let count = 0;

for (let i = 0; i < directions.length; i++) {
  const { direction, step } = directions[i];
  const sign = direction === "L" ? -1 : 1;
  const s = pos + step * sign;
  pos = s < 0 ? (100 + s) % 100 : s % 100;
  if (pos === 0) count++;
}

console.log(count);
