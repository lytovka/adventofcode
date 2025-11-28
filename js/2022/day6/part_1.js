import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2022, 6);
import { findIndex } from "./utils.js";

const packetStartIndex = findIndex(input, 4);
console.log(packetStartIndex);
