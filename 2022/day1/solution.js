import path from "path";
import fs from "fs";

const input = fs.readFileSync(path.resolve("input.txt"), "utf-8");

const rawArr = input
  .trim()
  .split("\n")
  .map((line) => Number(line));

const groups = [];
let currentGroup = [];

// group food items by elves
for (let i = 0; i < rawArr.length; i++) {
  const line = rawArr[i];
  if (line === 0) {
    groups.push(currentGroup);
    currentGroup = [];
  } else {
    currentGroup.push(line);
  }
}

const groupsAccumulatedCalories = groups.map((group) =>
  group.reduce((acc, cal) => acc + cal)
);

const maxCalories = Math.max(...groupsAccumulatedCalories);

console.log(groupsAccumulatedCalories);
console.log(maxCalories);

const groupsAccumulatedCaloriesSortedDesc = groupsAccumulatedCalories.sort(
  (a, b) => b - a
);

console.log(
  groupsAccumulatedCaloriesSortedDesc[0] +
    groupsAccumulatedCaloriesSortedDesc[1] +
    groupsAccumulatedCaloriesSortedDesc[2]
);
