import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2023, 12);

const rows = input2.trim().split("\n");

const countArrangements = (line, runs) => {
  if (runs.length === 0) return line.includes("#") ? 0 : 1;
  if (line.length === 0) return 0;
  console.log(line, runs);
  let result = 0;
  if (".?".includes(line[0])) {
    result += countArrangements(line.slice(1), runs);
  }
  if (
    "#?".includes(line[0]) &&
    runs[0] <= line.length &&
    !line.substring(0, runs[0]).includes(".") &&
    (runs[0] === line.length || line[runs[0]] != "#")
  ) {
    result += countArrangements(line.slice(runs[0] + 1), runs.slice(1));
  }
  console.log(result);
  return result;
};

let sum = 0;
for (const row of rows) {
  const [str, numsStr] = row.split(" ");
  const nums = numsStr.split(",").map(Number);
  sum += countArrangements(str, nums);
}

console.log(sum);
