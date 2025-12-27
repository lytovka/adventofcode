import { readInputFromFile } from "../../utils/misc.js";

const input = readInputFromFile(2025, 6);
const input2 = `
123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +
`;

const operation = (args, sign) => {
  const ops = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };
  const start = {
    "+": 0,
    "-": 0,
    "*": 1,
    "/": 1,
  };
  return args.reduce((acc, el) => ops[sign](acc, el), start[sign]);
};

const parsedProblems = input
  .trim()
  .split("\n")
  .map((line) =>
    line
      .split(" ")
      .filter(Boolean)
      .map((i) => i.trim()),
  );
const nums = parsedProblems.slice(0, parsedProblems.length - 1);
const signs = parsedProblems.at(-1);

let i = 0;
let res = 0;
while (i < signs.length) {
  let col = [];
  for (let j = 0; j < nums.length; j++) {
    col.push(parseInt(nums[j][i]));
  }
  res += operation(col, signs[i]);
  i++;
}

console.log(res);
