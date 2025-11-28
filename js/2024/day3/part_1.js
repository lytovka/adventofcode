import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2024, 3);

const matches = input.match(/mul\((\d+),(\d+)\)/g);
const parseMatches = matches.map((match) =>
  match
    .match(/mul\((\d+),(\d+)\)/)
    .slice(1)
    .map(Number),
);

console.log(parseMatches.reduce((acc, [a, b]) => acc + a * b, 0));
