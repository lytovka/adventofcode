import { readInputFromFile } from "~/utils/readInputFromFile.js";

const input = readInputFromFile(2023, 9);

const histories = input
  .trim()
  .split("\n")
  .map((line) => line.split(" ").map(Number));
console.log(histories);

const getDiff = (arr) => {
  let diff = [];
  for (let i = 1; i < arr.length; i++) {
    diff.push(arr[i] - arr[i - 1]);
  }
  return diff;
};

const findNextValue = (history) => {
  if (history.every((value) => value === history[0])) {
    return history[0];
  }

  const diff = getDiff(history);
  const nextDiff = findNextValue(diff);
  return history.at(-1) + nextDiff;
};

console.log(histories.map(findNextValue).reduce((acc, val) => acc + val, 0));
