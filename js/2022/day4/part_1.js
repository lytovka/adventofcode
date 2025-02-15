import input from "./input.js";
import { isSubset } from "./utils.js";

const pairs = input
  .trim()
  .split("\n")
  .map((line) =>
    line
      .split(",")
      .map((range) =>
        range.split("-").map((rangeBound) => parseInt(rangeBound, 10))
      )
  );

const pairsWithSubsets = pairs.filter(([a, b]) => isSubset(a, b));

console.log(pairsWithSubsets.length);
