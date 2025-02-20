import { readInputFromFile } from "~/utils/readInputFromFile.js";

const input = readInputFromFile(2024, 3);

const operations = {
  do: "do()",
  doNot: "don't()",
};
const matches = input.match(/mul\(\d+,\d+\)|do\(\)|don\'t\(\)/g);

let enabled = true;
let result = 0;

for (const match of matches) {
  if (match === operations.do) {
    enabled = true;
    continue;
  }
  if (match === operations.doNot) {
    enabled = false;
    continue;
  }

  console.log("match", match);
  const [num1, num2] = match
    .match(/mul\((\d+),(\d+)\)/)
    .slice(1)
    .map(Number);

  if (enabled) {
    result += num1 * num2;
  }
}

console.log(result);
