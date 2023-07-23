import input from "./input.js";

const patternLength = "[X]".length;
const pattern = new RegExp(`.{1,${patternLength + 1}}`, "g"); // +1 for the space

const [rawIndicesAndScheme, rawMoves] = input.split("\n\n");
const [indices, ...scheme] = rawIndicesAndScheme.split("\n").slice().reverse();

const arrOfStacks = Array.from(
  {
    length: indices.trim().split(/\s+/).length,
  },
  () => []
);

scheme.forEach((line) => {
  const parsedLine = line.match(pattern).map((s) => s.trim());
  parsedLine.forEach((value, i) => {
    value && arrOfStacks[i].push(value);
  });
});

const parsedMoves = rawMoves.split("\n").map((sentence) => {
  const numbers = sentence.match(/\d+/g).map(Number);
  return {
    quantity: numbers[0],
    from: numbers[1] - 1, // convert to 0-based index
    to: numbers[2] - 1, // convert to 0-based index
  };
});

parsedMoves.forEach(({ quantity, from, to }) => {
  for (let q = 0; q < quantity; q++) {
    let cratesToMove = arrOfStacks[from].pop();
    arrOfStacks[to].push(cratesToMove);
  }

  /* I don't know why this approach doesn't work...

  const cratesToMove = arrOfStacks[from].splice(-quantity);
  arrOfStacks[to].push(...cratesToMove);
  */
});

const solution = arrOfStacks
  .map((stack) => stack[stack.length - 1].replace(/\[|\]/g, ""))
  .join("");

console.log(solution);
