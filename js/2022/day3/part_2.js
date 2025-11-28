import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2022, 3);
import { findCommonCharacters, charVal, breakIntoGroupsOf } from "./utils.js";

const rucksacks = input.trim().split("\n");

const rucksacksGroupsByThree = breakIntoGroupsOf(rucksacks, 3);
const rucksacksGroupsByThreeCommonValues = rucksacksGroupsByThree
  .map((rucksacksGroup) => findCommonCharacters(...rucksacksGroup))
  .flat();

const rucksackGroupsCommonValuesTotal = rucksacksGroupsByThreeCommonValues
  .map((item) => charVal(item))
  .reduce((acc, val) => acc + val);

console.log(rucksackGroupsCommonValuesTotal);
