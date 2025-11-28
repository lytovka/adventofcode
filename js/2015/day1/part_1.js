import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2015, 1);
const chars = input.trim().split("");
let res = 0;
chars.forEach((char) => {
  if (char === "(") res++;
  if (char === ")") res--;
});
console.log(res);
