class Node {
  name;
  size;
  parent;

  constructor(name, parent = null, size = 0) {
    this.name = name;
    this.size = size;
    this.parent = parent;
  }
  /**
   * @param {number} size
   */
  set size(size) {
    this.size = size;
  }
  get size() {
    return this.size;
  }

  get parent() {
    return this.parent;
  }
}

class File extends Node {
  constructor(name, parent, size) {
    super(name, parent, size);
  }

  toString() {
    return this.name + " (dir," + "size=" + this.size + ")";
  }
}

class Directory extends Node {
  contents;

  constructor(name, parent) {
    super(name, parent);
    this.contents = [];
  }

  setSize() {
    let finalSize = 0;
    for (let c of this.getContents()) {
      if (c instanceof File) finalSize += c.size;
      if (c instanceof Directory) finalSize += c.setSize();
    }
    this.size = finalSize;
    return finalSize;
  }

  getContents() {
    return this.contents;
  }

  setContents(contents) {
    // this.children.push(...ch);
    this.contents.push(contents);
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
              this.currentNode = this.currentNode.parent;

              continue;
            } else {
              const newDir = new Directory(value, this.currentNode);
              this.currentNode.setContents(newDir);
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
        this.currentNode.setContents(newFile);

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
      const contents = this.currentNode.getContents();
      if (!Array.isArray(contents) || contents.length === 0) return;
      for (const c of contents) {
        this.setCurrentNode(c);
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
        stack.push(...node.getContents().reverse());
      }
    }
  }
}

export { FileSystem, Directory, File };
