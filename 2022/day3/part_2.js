import input from "./input.js";
import { findCommonCharacters, charVal, groupBy } from "./utils.js";

const rucksacks = input.trim().split("\n");

const rucksacksGroupsByThree = groupBy(rucksacks, 3);
const rucksacksGroupsByThreeCommonValues = rucksacksGroupsByThree
  .map((rucksacksGroup) => findCommonCharacters(...rucksacksGroup))
  .flat();

const rucksackGroupsCommonValuesTotal = rucksacksGroupsByThreeCommonValues
  .map((item) => charVal(item))
  .reduce((acc, val) => acc + val);

console.log(rucksackGroupsCommonValuesTotal);
