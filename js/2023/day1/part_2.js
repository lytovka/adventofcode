import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2023, 1);

const stringToDigit = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const splitRegex = /(one|two|three|four|five|six|seven|eight|nine|\d)/g;

const columns = input.trim().split("\n");

const numbers = columns.map((c) => {
  const numbers = c
    .match(splitRegex)
    .map((value) => stringToDigit[value] ?? value);
  return parseInt(numbers.at(0) + numbers.at(-1));
});

const sum = numbers.reduce((acc, n) => acc + n);

console.log(sum); // wrong answer (54305)
