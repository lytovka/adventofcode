import input from "./input.js";
import { isCommand, isFile, TreeNode } from "./utils.js";

const lines = input.split("\n");
const [, ...restLines] = lines;

let filesystemTree = new TreeNode("root", null, { type: "d" });

let currentNode = filesystemTree;
for (const line of restLines) {
  if (isCommand(line)) {
    const [_, command, value] = line.split(/\s+/);

    switch (command) {
      case "cd": {
        if (value === "..") {
          currentNode = currentNode.getParent();
        } else {
          const newNode = new TreeNode(value, currentNode, {
            type: "d",
            size: 0,
          });
          currentNode.setChildren(newNode);
          currentNode = newNode;
        }
      }
      case "ls": {
        continue;
      }
    }
  } else if (isFile(line)) {
    const [size, fileName] = line.split(/\s+/);
    currentNode.setChildren(
      new TreeNode(fileName, currentNode, {
        type: "f",
        size: parseInt(size),
      })
    );
  }
}

filesystemTree.findDirectorySizes();
const filtered = filesystemTree.filterDirectoriesBySize(10_0000);

console.log(filtered.reduce((acc, node) => acc + node.size, 0));
