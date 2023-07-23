import input from "./input.js";
import { findIndex } from "./utils.js";

const packetStartIndex = findIndex(input, 4);
console.log(packetStartIndex);
