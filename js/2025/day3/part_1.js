import { readInputFromFile } from "../../utils/misc.js";

const input = readInputFromFile(2025, 3);
const input2 = `
987654321111111
811111111111119
234234234234278
818181911112111
`;

const banks = input.trim().split("\n");

const maxs = [];
for (let i = 0; i < banks.length; i++) {
  const bank = banks[i];
  let max = -1;
  for (let j = 0; j < bank.length; j++) {
    for (let z = j + 1; z < bank.length; z++) {
      const val = parseInt(bank[j] + bank[z]);
      if (val > max) {
        max = val;
      }
    }
  }
  maxs.push(max);
}

console.log(maxs.reduce((acc, val) => acc + val, 0));
