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

const numLength = (num) => {
  return Math.floor(Math.log10(num) + 1);
};

const normalize = (nums) => {
  const numsLengths = nums.map(numLength);
  const maxLength = Math.max(...numsLengths);
  const res = [];
  for (let i = 0; i < numsLengths.length; i++) {
    const diff = maxLength - numsLengths[i];
    res[i] = diff === 0 ? nums[i] : nums[i] * 10 ** diff;
  }
  return { len: maxLength, res };
};

const concatDigits = (digits) => {
  return parseInt(digits.map((d) => d.toString()).join(""));
};

const convert = (nums) => {
  const { res: normalizedNums, len } = normalize(nums);
  let cur = len - 1;
  let newNums = [];
  while (cur >= 0) {
    const digits = [];
    for (let j = 0; j < normalizedNums.length; j++) {
      const digit = parseInt(normalizedNums[j].toString()[cur]);
      digits.push(digit);
    }
    newNums.push(concatDigits(digits));
    cur--;
  }
  return newNums;
};

const parsedProblems = input2
  .trim()
  .split("\n")
  .map((line) => line.split(/(?<=\S) /));
console.log(parsedProblems);
const nums = parsedProblems.slice(0, parsedProblems.length - 1);
const signs = parsedProblems.at(-1);

let i = parsedProblems.length - 1;
let res = 0;
while (i >= 0) {
  let col = [];
  for (let j = 0; j < nums.length; j++) {
    col.push(parseInt(nums[j][i]));
  }
  const converted = convert(col);
  console.log(converted);
  res += operation(converted, signs[i]);
  i--;
}

console.log(res);
