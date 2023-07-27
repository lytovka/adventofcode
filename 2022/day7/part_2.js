import input from "./input.js";
import { isCommand, isFile, FileSystem, UPDATE_DISK_SPACE } from "./utils.js";

const lines = input.split("\n");
const [, ...restLines] = lines;

let filesystem = new FileSystem();

for (const line of restLines) {
  if (isCommand(line)) {
    const [_$, command, value] = line.split(/\s+/);

    switch (command) {
      case "cd": {
        filesystem.cd(value);
      }
      case "ls": {
        // filesystem.ls();
        continue;
      }
    }
    continue;
  }
  if (isFile(line)) {
    const [size, fileName] = line.split(/\s+/);
    filesystem.touch(fileName, size);
    continue;
  }
}

filesystem.findDirectorySizes();
// filesystem.printTree();

const requiredToFreeUp = UPDATE_DISK_SPACE - filesystem.freeDiskSpace;
const filtered = filesystem.filterDirectoriesBySize(requiredToFreeUp, "asc");
console.log(filtered.sort((node1, node2) => node1.size - node2.size)[0].size);
