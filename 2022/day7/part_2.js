import input from "./input.js";
import { FileSystem, Directory, UPDATE_DISK_SPACE } from "./utils.js";

const lines = input.split("\n");

let filesystem = new FileSystem(lines);
filesystem.printFileSystem();

const dirs = [...filesystem].filter((node) => node instanceof Directory);

const requiredToFreeUp = UPDATE_DISK_SPACE - filesystem.freeDiskSpace;
const candidateDirs = dirs.filter((dir) => dir.size > requiredToFreeUp);
console.log(candidateDirs.sort((dir1, dir2) => dir1.size - dir2.size)[0].size);
