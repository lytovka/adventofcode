import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2022, 6);
import { findIndex } from "./utils.js";

const index = findIndex(input, 14);
console.log(index);
