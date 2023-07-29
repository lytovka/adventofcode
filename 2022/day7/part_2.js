import input from "./input.js";
import { FileSystem2, UPDATE_DISK_SPACE } from "./utils.js";

const lines = input.split("\n");

let filesystem2 = new FileSystem2(lines)
filesystem2.printFileSystem()

const requiredToFreeUp = UPDATE_DISK_SPACE - filesystem2.freeDiskSpace;
const filtered = filesystem2.filterDirectoriesBySize(requiredToFreeUp, "asc");
console.log(filtered.sort((node1, node2) => node1.size - node2.size)[0].size);
