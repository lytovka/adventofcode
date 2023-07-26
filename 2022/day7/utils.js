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
    const indentation = " ".repeat(depth * 2) + "- ";
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

  filterDirectoriesBySize(size, node = this, accumulator = []) {
    const children = node.getChildren();
    if (!Array.isArray(children) || children.length === 0) return;
    for (const child of children) {
      if (child.type === "d" && child.size <= size) {
        accumulator.push(child);
      }
      this.filterDirectoriesBySize(size, child, accumulator);
    }
    return accumulator;
  }
}

const isCommand = (line) => line.startsWith("$");
const isDirectory = (line) => line.startsWith("dir");
const isFile = (line) => !Number.isNaN(parseInt(line.split(/\s+/)[0]));

export { isCommand, isDirectory, isFile, TreeNode };
