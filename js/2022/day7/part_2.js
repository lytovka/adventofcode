import { readInputFromFile } from "~/utils/readInputFromFile.js";

const input = readInputFromFile(2022, 7);
import { FileSystem, Directory } from "./utils.js";

const lines = input.split("\n");

let filesystem = new FileSystem(lines);
filesystem.printFileSystem();

const dirs = [...filesystem].filter((node) => node instanceof Directory);

const UPDATE_SIZE = 30_000_000;
const requiredToFreeUp = UPDATE_SIZE - filesystem.freeDiskSpace;
const candidateDirs = dirs.filter((dir) => dir.size > requiredToFreeUp);
console.log(candidateDirs.sort((dir1, dir2) => dir1.size - dir2.size)[0].size);
