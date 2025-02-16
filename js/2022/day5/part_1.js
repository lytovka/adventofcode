import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2022, 5);
import {
  generateArrayOfStacks,
  parseAndSaveScheme,
  parseMoves,
} from "./utils.js";

const [rawIndicesAndScheme, rawMoves] = input.split("\n\n");
const [indices, ...scheme] = rawIndicesAndScheme.split("\n").slice().reverse();

const stacks = generateArrayOfStacks(indices);
parseAndSaveScheme(scheme, stacks);
const parsedMoves = parseMoves(rawMoves);

parsedMoves.forEach(({ quantity, from, to }) => {
  for (let q = 0; q < quantity; q++) {
    let cratesToMove = stacks[from].pop();
    stacks[to].push(cratesToMove);
  }
});

const solution = stacks
  .map((stack) => stack[stack.length - 1].replace(/\[|\]/g, ""))
  .join("");

console.log(solution);
