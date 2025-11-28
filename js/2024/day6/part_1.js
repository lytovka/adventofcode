import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2024, 6).trim().split("\n");

const move = (direction, x, y) => {
  if (direction === "up") {
    return [x, y - 1];
  } else if (direction === "down") {
    return [x, y + 1];
  } else if (direction === "left") {
    return [x - 1, y];
  } else if (direction === "right") {
    return [x + 1, y];
  }
};

const isNextObstacle = (direction, x, y) => {
  if (direction === "up") {
    return input[y - 1][x] === "#";
  } else if (direction === "down") {
    return input[y + 1][x] === "#";
  } else if (direction === "left") {
    return input[y][x - 1] === "#";
  } else if (direction === "right") {
    return input[y][x + 1] === "#";
  }
};

const turn = (direction) => {
  if (direction === "up") {
    return "right";
  } else if (direction === "right") {
    return "down";
  } else if (direction === "down") {
    return "left";
  } else if (direction === "left") {
    return "up";
  }
};

const isNextOutBound = (direction, x, y) => {
  if (direction === "up") {
    return y - 1 < 0;
  } else if (direction === "down") {
    return y + 1 >= input.length;
  } else if (direction === "left") {
    return x - 1 < 0;
  } else if (direction === "right") {
    return x + 1 >= input[0].length;
  }
};

let x = 0,
  y = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === "^") {
      x = j;
      y = i;
    }
  }
}

let steps = new Set();
let direction = "up";
while (true) {
  steps.add(`${x}:${y}`);
  if (isNextOutBound(direction, x, y)) {
    break;
  }
  if (isNextObstacle(direction, x, y)) {
    direction = turn(direction);
    continue;
  }
  [x, y] = move(direction, x, y);
}

console.log(steps.size);
