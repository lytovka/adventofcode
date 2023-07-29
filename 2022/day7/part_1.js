import input from "./input.js";
import { FileSystem2 } from "./utils.js";

const lines = input.split("\n");
const [, ...restLines] = lines;

let filesystem2 = new FileSystem2(lines)
filesystem2.printFileSystem()

const filtered = filesystem2.filterDirectoriesBySize(100_000, "desc");
console.log(filtered)
console.log(filtered.reduce((acc, node) => acc + node.size, 0));
