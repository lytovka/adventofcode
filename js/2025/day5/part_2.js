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

const [ranges, _] = input
  .trim()
  .split("\n\n")
  .map((l) => l.trim());
const parsedRange = ranges.split("\n").map((entry) => {
  const [_, d1, d2] = /(\d+)-(\d+)/.exec(entry);
  return { min: +d1, max: +d2 };
});

const freshIdRanges = [];

parsedRange.sort((a, b) => a.min - b.min);

parsedRange.forEach((range) => {
  if (freshIdRanges.length === 0) {
    freshIdRanges.push(range);
    return;
  }
  const last = freshIdRanges[freshIdRanges.length - 1];
  if (range.min <= last.max + 1) {
    last.max = Math.max(last.max, range.max);
  } else {
    freshIdRanges.push(range);
  }
});

console.log(freshIdRanges);
console.log(freshIdRanges.reduce((acc, el) => el.max - el.min + 1 + acc, 0));
