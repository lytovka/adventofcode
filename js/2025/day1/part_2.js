import { readInputFromFile } from "../../utils/misc.js";

const input = readInputFromFile(2025, 1);
const input2 = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`
const directions = input
  .trim()
  .split("\n")
  .map((line) => ({ direction: line[0], step: parseInt(line.slice(1)) }));
console.log(input2)

let pos = 50;
let count = 0;

// 3402 low
// 5980 low
// 6836 high
// 6318 wrong
//

for (let i = 0; i < directions.length; i++) {
  let done = false
  const { direction, step } = directions[i];
  const sign = direction === "L" ? -1 : 1;
  const s = pos + step * sign;
  console.log({ i, sign, pos, step, s, count })
  pos = s < 0 ? (100 + s) % 100 : s % 100;
  if (pos === 0) {
    count++
    done = true
  }
  if (!done && sign === -1 && s < 0) {
    count += Math.floor(Math.abs(s) / 100) || 1
  }
  else if (!done && sign === 1 && s > 100) {
    count += Math.floor(s / 100)
  }
  console.log({ i, sign, pos, step, s, count })
  console.log("---")
  done = false
}

console.log(count);
