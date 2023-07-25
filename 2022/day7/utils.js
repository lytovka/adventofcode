class TreeNode {
  constructor(name, parent, isDirectory = false) {
    this.name = name;
    this.isDirectory = isDirectory;
    this.children = [];
    this.parent = parent;
  }

  getParent() {
    return this.parent;
  }

  getChildren() {
    return this.children;
  }

  setChildren(nodes) {
    if (this.isDirectory === true) {
      if (Array.isArray(nodes)) {
        this.children.push(...nodes);
      } else {
        this.children.push(nodes);
      }
    }
  }

  printTree(node = this, depth = 0) {
    const indentation = " ".repeat(depth * 2);
    console.log(indentation + node.name);
    const children = node.getChildren();
    if (!Array.isArray(children) || children.length === 0) return;
    for (const child of children) {
      this.printTree(child, depth + 1);
    }
  }
}

const isCommand = (line) => line.startsWith("$");
const isDirectory = (line) => line.startsWith("dir");
const isFile = (line) => !Number.isNaN(parseInt(line.split(/\s+/)[0]));

function executeCommand(commandLine, tree) {
  const command = commandLine.split(/\s+/)[1];

  switch (command) {
    case "cd": {
      const value = commandLine.split(/\s+/)[2];
      if (value !== ".." && value !== "/") {
        tree.setChildren(new TreeNode(dirName, tree, true));
      }
    }
    case "ls": {
    }
  }
}

function saveDirectory(dirName, tree) {
  tree.setChildren(new TreeNode(dirName, tree, true));
}

function saveFile(fileName, tree) {
  tree.setChildren(new TreeNode(fileName, tree, false));
}

export { executeCommand, isCommand, isDirectory, isFile, TreeNode };
