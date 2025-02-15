import input from "./input.js";
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
  const cratesToMove = stacks[from].splice(-quantity);
  stacks[to].push(...cratesToMove);
});

const solution = stacks
  .map((stack) => stack[stack.length - 1].replace(/\[|\]/g, ""))
  .join("");

console.log(solution);
