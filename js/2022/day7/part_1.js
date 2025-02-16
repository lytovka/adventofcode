import { readInputFromFile } from "~/utils/readInputFromFile.js";

const input = readInputFromFile(2022, 7);
import { FileSystem, Directory } from "./utils.js";

const lines = input.split("\n");

let filesystem = new FileSystem(lines);
filesystem.printFileSystem();
const dirs = [...filesystem].filter((node) => node instanceof Directory);

let res = 0;
for (let localDir of dirs) {
  let size = localDir.size;
  if (size < 100_000) {
    res += size;
  }
}

console.log(res);
