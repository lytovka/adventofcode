const defaultOptions = {
  type: "f", // `f` or `d`
  size: 0,
};

class TreeNode {
  constructor(name, parent, options = defaultOptions) {
    this.name = name;
    this.type = options.type;
    this.children = [];
    this.parent = parent;
    this.size = options.size;
  }

  getParent() {
    return this.parent;
  }

  getChildren() {
    return this.children;
  }

  setChildren(nodes) {
    if (this.type === "d") {
      if (Array.isArray(nodes)) {
        this.children.push(...nodes);
      } else {
        this.children.push(nodes);
      }
    }
  }

  setSize(size) {
    this.size = size;
  }

  printTree(node = this, depth = 0) {
    const indentation = ".".repeat(depth * 2) + "- ";
    console.log(
      indentation + node.name + " (" + node.type + ", size=" + node.size + ")"
    );
    const children = node.getChildren();
    if (!Array.isArray(children) || children.length === 0) return;
    for (const child of children) {
      this.printTree(child, depth + 1);
    }
  }

  findDirectorySizes(node = this) {
    const children = node.getChildren();
    if (!Array.isArray(children) || children.length === 0)
      return this.size || 0;
    let local_size = 0;
    for (const child of children) {
      if (child.type === "d") {
        local_size += this.findDirectorySizes(child, local_size);
      } else {
        local_size += child.size;
      }
    }
    node.setSize(local_size);
    return local_size;
  }

  filterDirectoriesBySize(size, option) {
    if (option === "asc") return this.#filterDirectoriesBySizeAscending(size);
    if (option === "desc") return this.#filterDirectoriesBySizeDescending(size);
    throw new Error(`Invalid option: ${option}`);
  }

  #filterDirectoriesBySizeAscending(size, node = this, accumulator = []) {
    const children = node.getChildren();
    if (!Array.isArray(children) || children.length === 0) return;
    for (const child of children) {
      if (child.type === "d" && child.size >= size) {
        accumulator.push(child);
      }
      this.#filterDirectoriesBySizeAscending(size, child, accumulator);
    }
    return accumulator;
  }

  #filterDirectoriesBySizeDescending(size, node = this, accumulator = []) {
    const children = node.getChildren();
    if (!Array.isArray(children) || children.length === 0) return;
    for (const child of children) {
      if (child.type === "d" && child.size <= size) {
        accumulator.push(child);
      }
      this.#filterDirectoriesBySizeDescending(size, child, accumulator);
    }
    return accumulator;
  }
}

const DISK_SPACE = 70_000_000;

class FileSystem {
  constructor() {
    this.root = new TreeNode("root", null, { type: "d" });
    this.currentNode = this.root;
    this.occupiedDiskSpace = this.root.size;
    this.totalDiskSpace = DISK_SPACE;
  }

  get freeDiskSpace() {
    return this.totalDiskSpace - this.occupiedDiskSpace;
  }

  cd(value) {
    if (value === "..") {
      this.currentNode = this.currentNode.getParent();
    } else {
      const newNode = new TreeNode(value, this.currentNode, {
        type: "d",
        size: 0,
      });
      this.currentNode.setChildren(newNode);
      this.currentNode = newNode;
    }
  }

  ls() {
    return this.currentNode.getChildren();
  }

  touch(fileName, size) {
    this.currentNode.setChildren(
      new TreeNode(fileName, this.currentNode, {
        type: "f",
        size: parseInt(size),
      })
    );
  }

  printTree() {
    this.root.printTree();
  }

  findDirectorySizes() {
    this.root.findDirectorySizes();
    this.occupiedDiskSpace = this.root.size;
  }

  filterDirectoriesBySize(size, option) {
    return this.root.filterDirectoriesBySize(size, option);
  }
}

const isCommand = (line) => line.startsWith("$");
const isDirectory = (line) => line.startsWith("dir");
const isFile = (line) => !Number.isNaN(parseInt(line.split(/\s+/)[0]));
const UPDATE_DISK_SPACE = 30_000_000;

export { isCommand, isDirectory, isFile, UPDATE_DISK_SPACE, FileSystem };
