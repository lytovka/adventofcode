import { readInputFromFile } from "../../utils/misc.js";

const input = readInputFromFile(2025, 2);
const input2 = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;
const ranges = input.split(",");

const expandedRanges = ranges.map((r) => {
  const res = [];
  const [low, high] = r.split("-");
  let l = parseInt(low);
  let h = parseInt(high);
  for (let i = l; i <= h; i++) {
    res.push(i.toString());
  }
  return res;
});

const values = [];
for (let i = 0; i < expandedRanges.length; i++) {
  const range = expandedRanges[i];
  for (let j = 0; j < range.length; j++) {
    const num = range[j];
    if (num.length % 2 == 1) continue;
    const left = range[j].slice(0, num.length / 2);
    const right = range[j].slice(num.length / 2);
    if (left === right) values.push(parseInt(num));
  }
}

console.log(values.reduce((acc, v) => acc + v, 0));
