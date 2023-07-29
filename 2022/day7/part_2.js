import input from "./input.js";
import { FileSystem, UPDATE_DISK_SPACE } from "./utils.js";

const lines = input.split("\n");

let filesystem = new FileSystem(lines);
filesystem.printFileSystem();

const requiredToFreeUp = UPDATE_DISK_SPACE - filesystem.freeDiskSpace;
const filtered = filesystem.filterDirectoriesBySize(requiredToFreeUp, "asc");
console.log(filtered.sort((node1, node2) => node1.size - node2.size)[0].size);
