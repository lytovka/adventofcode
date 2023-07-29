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

  print() {
    console.log(this.name + " (dir," + "size=" + this.getSize() + ")");
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
      if (this.isCommand(line)) {
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
      if (this.isFile(line)) {
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
      console.log(
        indentation +
          this.currentNode.name +
          " (file," +
          "size=" +
          this.currentNode.size +
          ")"
      );
    }
    return;
  }

  filterDirectoriesBySize(size, option) {
    this.currentNode = this.root;
    if (option === "asc") return this.#filterDirectoriesBySizeAscending(size);
    if (option === "desc") return this.#filterDirectoriesBySizeDescending(size);
    throw new Error(`Invalid option: ${option}`);
  }

  #filterDirectoriesBySizeAscending(size, accumulator = []) {
    if (this.currentNode instanceof Directory) {
      const children = this.currentNode.getChildren();
      for (const child of children) {
        if (child instanceof Directory && child.size >= size) {
          accumulator.push(child);
        }
        this.setCurrentNode(child);
        this.#filterDirectoriesBySizeAscending(size, accumulator);
      }
    }
    return accumulator;
  }

  #filterDirectoriesBySizeDescending(size, accumulator = []) {
    if (this.currentNode instanceof Directory) {
      const children = this.currentNode.getChildren();
      for (const child of children) {
        if (child instanceof Directory && child.size <= size) {
          accumulator.push(child);
        }
        this.setCurrentNode(child);
        this.#filterDirectoriesBySizeDescending(size, accumulator);
      }
    }
    return accumulator;
  }

  isCommand = (line) => line.startsWith("$");
  isDirectory = (line) => line.startsWith("dir");
  isFile = (line) => !Number.isNaN(parseInt(line.split(/\s+/)[0]));
}

const UPDATE_DISK_SPACE = 30_000_000;

export { UPDATE_DISK_SPACE, FileSystem as FileSystem2 };
