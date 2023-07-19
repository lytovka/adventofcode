import path from "path";
import fs from "fs";

const input = fs.readFileSync(path.resolve("input.txt"), "utf-8");

const groups = input.trim().split("\n\n");

console.log(groups);

const groupsAccumulatedCalories = groups.map((group) =>
  group
    .split("\n")
    .map((s) => parseInt(s, 10))
    .reduce((acc, cal) => acc + cal)
);

const groupsAccumulatedCaloriesSortedDesc = groupsAccumulatedCalories.sort(
  (a, b) => b - a
);

console.log(groupsAccumulatedCaloriesSortedDesc[0]);
