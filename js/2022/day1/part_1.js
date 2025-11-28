import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2022, 1);

const groups = input.trim().split("\n\n");

const groupsAccumulatedCalories = groups.map((group) =>
  group
    .split("\n")
    .map((s) => parseInt(s, 10))
    .reduce((acc, cal) => acc + cal),
);

const groupsAccumulatedCaloriesSortedDesc = groupsAccumulatedCalories.sort(
  (a, b) => b - a,
);

console.log(groupsAccumulatedCaloriesSortedDesc[0]);
