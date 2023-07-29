import input from "./input.js";
import { FileSystem } from "./utils.js";

const lines = input.split("\n");

let filesystem = new FileSystem(lines);
filesystem.printFileSystem();

const filtered = filesystem.filterDirectoriesBySize(100_000, "desc");
console.log(filtered.reduce((acc, node) => acc + node.size, 0));
