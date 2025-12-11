import { readInputFromFile } from "../../utils/misc.js";

const input = readInputFromFile(2025, 3);
const input2 = `
987654321111111
811111111111119
234234234234278
818181911112111
`
const NUMBER_LENGTH = 12

// 8 1 8 1 8 1 9 1 1 1  1  2  1  1  1
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14
// 
// result: 888911112111
//
// need: 12 
// possible candidate range at position i: [i, n-(12-p)], where p is the index of the resulting list of picked values   
//
// iteration 0
// i: 0
// p: 0
// candidates indixes [0, 15-(12-0)=3] = [8,1,8,1]
// keep 8 since the biggest
// res = [8]
//
// iteration 1
// i: 1
// p: 1
// candidates [1, 15-(12-1)=4] = [1,8,1,8]
// there are bigger candidates, skip this iteration
//
// iteration 2
// i: 2
// p: 1
// candidates [2, 4] = [8,1,8]
// keep 8 since the biggest
// res = [8,8]
//
// iteration 3
// i: 3
// p: 2
// candidates [3, 15-(12-2)=5] = [1,8,1]
// skip
//
// i: 4
// p: 2
// [4, 5] = [8,1]
// keep 8
// res = [8,8,8]
//
// i: 5
// p: 3
// [5, 15-(12-3)=6] = [1,9]
// res = [8,8,8]
const banks = input.trim().split("\n")

let res = []
banks.forEach((bank) => {
  const stack = []
  for (let i = 0; i < bank.length && stack.length < NUMBER_LENGTH; i++) {
    const digit = parseInt(bank[i])
    const candidates = bank.slice(i, bank.length - (NUMBER_LENGTH - stack.length) + 1)
    if (candidates.length === 0) {
      stack.push(digit)
      continue;
    }
    const max = Math.max(...candidates)
    if (digit === max) {
      stack.push(digit)
    }
  }
  res.push(parseInt(stack.join("")))
})

console.log(res.reduce((acc, val) => acc + val, 0));
