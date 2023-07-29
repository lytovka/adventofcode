class Node {
  constructor(name, size = 0) {
    this.name = name;
    this.size = size;
  }
}

class File extends Node {
  constructor(name, parent, size) {
    super(name, size);
    this.parent = parent;
  }

  toString() {
    return this.name + " (dir," + "size=" + this.getSize() + ")";
  }

  setSize(size) {
    this.size = size;
  }

  getSize() {
    return this.size;
  }

  getParent() {
    return this.parent;
  }
}

class Directory extends Node {
  constructor(name, parent) {
    super(name);
    this.parent = parent;
    this.children = [];
  }

  setSize() {
    let finalSize = 0;
    for (let child of this.getChildren()) {
      if (child instanceof File) finalSize += child.getSize();
      if (child instanceof Directory) finalSize += child.setSize();
    }
    this.size = finalSize;
    return finalSize;
  }

  getParent() {
    return this.parent;
  }

  getChildren() {
    return this.children;
  }

  setChildren(ch) {
    // this.children.push(...ch);
    this.children.push(ch);
  }
}

class FileSystem {
  root;
  currentNode;
  totalDiskSpace;

  constructor(input) {
    this.build(input);
    this.totalDiskSpace = 70_000_000;
  }

  get freeDiskSpace() {
    return this.totalDiskSpace - this.root.size;
  }

  build(input) {
    for (const line of input) {
      // commands
      if (line.startsWith("$")) {
        const [_$, command, value] = line.split(/\s+/);

        switch (command) {
          case "cd": {
            if (value === "/") {
              this.root = new Directory("root", null);
              this.currentNode = this.root;

              continue;
            }
            if (value === "..") {
              this.currentNode = this.currentNode.getParent();

              continue;
            } else {
              const newDir = new Directory(value, this.currentNode);
              this.currentNode.setChildren(newDir);
              this.currentNode = newDir;
            }
          }
          case "ls": {
            continue;
          }
        }
      }
      // files
      if (!Number.isNaN(parseInt(line.split(/\s+/)[0]))) {
        const [size, fileName] = line.split(/\s+/);
        const newFile = new File(fileName, this.currentNode, parseInt(size));
        this.currentNode.setChildren(newFile);

        continue;
      }
    }
    this.currentNode = this.root;
  }

  setCurrentNode(node) {
    this.currentNode = node;
  }

  printFileSystem(depth = 0) {
    const indentation = ".".repeat(depth * 2) + "- ";
    if (this.currentNode instanceof Directory) {
      console.log(
        indentation +
          this.currentNode.name +
          " (dir," +
          "size=" +
          this.currentNode.setSize() +
          ")"
      );
      const children = this.currentNode.getChildren();
      if (!Array.isArray(children) || children.length === 0) return;
      for (const child of children) {
        this.setCurrentNode(child);
        this.printFileSystem(depth + 1);
      }
    }
    if (this.currentNode instanceof File) {
      console.log(indentation + this.currentNode.toString());
    }
    return;
  }

  // Add the Symbol.iterator method to make the instance iterable
  *[Symbol.iterator]() {
    // Perform a depth-first traversal of the file system
    const stack = [this.root];

    while (stack.length > 0) {
      const node = stack.pop();

      if (node instanceof File) {
        yield node;
      } else if (node instanceof Directory) {
        yield node;
        // Since we want to traverse from left to right (child to parent),
        // we add children to the stack in reverse order
        stack.push(...node.getChildren().reverse());
      }
    }
  }
}

export { FileSystem, Directory, File };
