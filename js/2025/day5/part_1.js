import { readInputFromFile } from "../../utils/misc.js";

const input = readInputFromFile(2025, 5);
const input2 = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`.trim();

const [ranges, ids] = input
  .trim()
  .split("\n\n")
  .map((l) => l.trim());
const parsedRange = ranges.split("\n").map((entry) => {
  const [_, d1, d2] = /(\d+)-(\d+)/.exec(entry);
  return { min: +d1, max: +d2 };
});

let count = 0;

// 989 - too high
// 970 - too high
ids
  .trim()
  .split("\n")
  .forEach((id) => {
    for (let i = 0; i < parsedRange.length; i++) {
      const { min, max } = parsedRange[i];
      const numId = +id;
      if (numId >= min && numId <= max) {
        count++;
        break;
      }
    }
  });

console.log(ids, count);
