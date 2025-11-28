import { readInputFromFile } from "~/utils/misc.js";

const [priorities, sequences] = readInputFromFile(2024, 5).split("\n\n");

const priorityMap = new Map();
const priorityNumbers = priorities
  .trim()
  .split("\n")
  .map((line) => line.split("|").map(Number));
const sequenceParsed = sequences
  .split("\n")
  .map((line) => line.split(",").map(Number));

priorityNumbers.forEach(([prev, next]) => {
  const existing = priorityMap.get(prev);
  priorityMap.set(prev, existing ? [...existing, next] : [next]);
});

let res = 0;
sequenceParsed.forEach((line) => {
  let yes = true;
  for (let i = 0; i < line.length - 1; i++) {
    const current = line[i];
    const next = line[i + 1];
    const nextPriority = priorityMap.get(current);
    if (!nextPriority || !nextPriority.includes(next)) {
      yes = false;
      break;
    }
  }
  if (yes) {
    const midElement = line[Math.floor(line.length / 2)];
    console.log(line, midElement);
    res += midElement;
    result++;
  }
});

console.log(res);
