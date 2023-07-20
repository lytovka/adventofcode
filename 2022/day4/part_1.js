import input from "./input.js";

const pairs = input
  .trim()
  .split("\n")
  .map((pair) => pair.split(","));

const pairsRangesParsed = pairs.map((pair) =>
  pair.map((numberRange) =>
    numberRange.split("-").map((number) => parseInt(number, 10))
  )
);

let res = 0;

for (const pair of pairsRangesParsed) {
  if (
    (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
    (pair[1][0] >= pair[0][0] && pair[1][1] <= pair[0][1])
  ) {
    res += 1;
  }
}

console.log(res);
