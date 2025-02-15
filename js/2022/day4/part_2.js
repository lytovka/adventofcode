import input from "./input.js";
import { hasIntersection } from "./utils.js";

const ranges = input
  .trim()
  .split("\n")
  .map((line) =>
    line
      .split(",")
      .map((range) =>
        range.split("-").map((rangeBound) => parseInt(rangeBound, 10))
      )
  );

console.log(ranges);

const rangesIntersected = ranges.filter(([a, b]) => hasIntersection(a, b));

console.log(rangesIntersected.length);
