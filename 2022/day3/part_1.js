import { readFileSync } from "fs";
import { resolve } from "path";

const a_code = "a".charCodeAt();
const A_code = "A".charCodeAt();

const medianPos = (strLen) => Math.floor(strLen / 2);

const findCommonCharacters = (str1, str2) => {
  const commonCharacters = new Set();
  const str1Chars = str1.split("");
  for (let c of str1Chars) {
    if (str2.includes(c)) {
      commonCharacters.add(c);
    }
  }
  return [...commonCharacters];
};

const charVal = (char) => {
  return /[a-z]/.test(char)
    ? char.charCodeAt() - a_code + 1
    : char.charCodeAt() - A_code + 27;
};

const input = readFileSync(resolve("input.txt"), "utf-8");
const rucksacks = input.trim().split("\n");

const rucksackWithItems = rucksacks.map((rucksack) => [
  rucksack.substring(0, medianPos(rucksack.length)),
  rucksack.substring(medianPos(rucksack.length)),
]);

const ruckSackCommonItems = rucksackWithItems
  .map((rucksack) => findCommonCharacters(rucksack[0], rucksack[1]))
  .flat();

const ruckSackCommonValuesTotal = ruckSackCommonItems
  .map((item) => charVal(item))
  .reduce((acc, val) => acc + val);

console.log(ruckSackCommonValuesTotal);
console.log("b".charCodeAt() - a_code);
