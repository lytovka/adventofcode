import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2022, 3);
import { medianPos, findCommonCharacters, charVal } from "./utils.js";

const rucksacks = input.trim().split("\n");

const rucksackWithItems = rucksacks.map((rucksack) => [
  rucksack.substring(0, medianPos(rucksack.length)),
  rucksack.substring(medianPos(rucksack.length)),
]);

const ruckSackCommonItems = rucksackWithItems
  .map((rucksack) => findCommonCharacters(...rucksack))
  .flat();

const ruckSackCommonValuesTotal = ruckSackCommonItems
  .map((item) => charVal(item))
  .reduce((acc, val) => acc + val);

console.log(ruckSackCommonValuesTotal);
