import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2024, 2);

const isSafe = (sequence) => {
  const asc = new Set([1, 2, 3]);
  const desc = new Set([-1, -2, -3]);

  for (let i = 1; i < sequence.length; i++) {
    let res = sequence[i] - sequence[i - 1];
    asc.add(res);
    desc.add(res);
  }
  return asc.size === 3 || desc.size === 3;
};

const rows = input.split("\n").map((row) => row.split(" ").map(Number));

let result = 0;

for (const row of rows) {
  let tolerable = false;
  for (let i = 0; i < row.length; i++) {
    const arr = [...row.slice(0, i), ...row.slice(i + 1)];

    if (isSafe(arr)) {
      tolerable = true;
      break;
    }
  }
  if (isSafe(row) || tolerable) {
    result += 1;
  }
}

console.log(result);
