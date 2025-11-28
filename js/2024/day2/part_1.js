import { readInputFromFile } from "~/utils/misc.js";

const getOrder = (num1, num2) => {
  return num1 > num2 ? "d" : num1 < num2 ? "i" : "n";
};

const input = readInputFromFile(2024, 2);
const rows = input.split("\n").map((row) => row.split(" ").map(Number));

let result = 0;
rows.forEach((row) => {
  let save = true;
  const order = getOrder(row[0], row[1]);
  if (order === "n") return;
  for (let i = 0; i < row.length - 1; i++) {
    if (
      Math.abs(row[i] - row[i + 1]) > 3 ||
      getOrder(row[i], row[i + 1]) !== order
    ) {
      save = false;
    }
  }
  if (save) {
    result += 1;
  }
});

console.log(result);
