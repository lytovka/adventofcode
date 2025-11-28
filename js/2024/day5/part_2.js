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

let wrongSequencesIndex = [];
sequenceParsed.forEach((line, index) => {
  for (let i = 0; i < line.length - 1; i++) {
    const current = line[i];
    const next = line[i + 1];
    const nextPriority = priorityMap.get(current);
    if (!nextPriority || !nextPriority.includes(next)) {
      wrongSequencesIndex.push(index);
      break;
    }
  }
});

let res = 0;
for (let index of wrongSequencesIndex) {
  let line = sequenceParsed[index];
  const sortedLineToPriority = line.sort((a, b) => {
    const pageOrders = priorityMap.get(a);
    if (!pageOrders) return 1;
    if (pageOrders.includes(b)) return -1;
    return 0;
  });
  const midElement =
    sortedLineToPriority[Math.floor(sortedLineToPriority.length / 2)];
  res += midElement;
}

console.log(res); // 4522 - too low
