import input from "./input.js";
import { isCommand, isFile, TreeNode } from "./utils.js";

const lines = input.split("\n");
console.log(lines);

const [, ...restLines] = lines;

let dirTree = new TreeNode("root", null, true);
let currentNode = dirTree;

for (const line of restLines) {
  if (isCommand(line)) {
    const command = line.split(/\s+/)[1];

    switch (command) {
      case "cd": {
        const value = line.split(/\s+/)[2];
        if (value === "..") {
          currentNode = currentNode.getParent();
        } else {
          const newNode = new TreeNode("dir " + value, currentNode, true);
          currentNode.setChildren(newNode);
          currentNode = newNode;
        }
      }
      case "ls": {
        continue;
      }
    }
  } else if (isFile(line)) {
    currentNode.setChildren(new TreeNode("file " + line, currentNode, false));
  }
}

// const tree = new TreeNode("root", null, true);
// const child1 = new TreeNode("child1", tree, true);
// const child2 = new TreeNode("child2", tree, true);
// tree.setChildren([child1, child2]);
// child1.setChildren(new TreeNode("child1-1.txt", child1, false));
// child1.setChildren(new TreeNode("child1-2.txt", child1, false));
// child2.setChildren(new TreeNode("child2-1.txt", child2, false));

dirTree.printTree();
