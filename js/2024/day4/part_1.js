import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2024, 4)
  .split("\n")
  .map((line) => line.split(""));

const acceptedAnswers = new Set(["XMAS", "SAMX"]);
let result = 0;

function readTo(input, x, y) {
  function east() {
    return concat([x, y], [x, y + 1], [x, y + 2], [x, y + 3]);
  }
  function south() {
    return concat([x, y], [x + 1, y], [x + 2, y], [x + 3, y]);
  }
  function west() {
    return concat([x, y], [x, y - 1], [x, y - 2], [x, y - 3]);
  }
  function north() {
    return concat([x, y], [x - 1, y], [x - 2, y], [x - 3, y]);
  }
  function northEast() {
    return concat([x, y], [x - 1, y + 1], [x - 2, y + 2], [x - 3, y + 3]);
  }
  function northWest() {
    return concat([x, y], [x - 1, y - 1], [x - 2, y - 2], [x - 3, y - 3]);
  }
  function southEast() {
    return concat([x, y], [x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3]);
  }
  function southWest() {
    return concat([x, y], [x + 1, y - 1], [x + 2, y - 2], [x + 3, y - 3]);
  }

  function concat(...coords) {
    const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = coords;
    return input[x1][y1] + input[x2][y2] + input[x3][y3] + input[x4][y4];
  }

  return {
    east,
    west,
    north,
    south,
    northEast,
    northWest,
    southEast,
    southWest,
  };
}

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    Object.values(readTo(input, i, j)).forEach((fn) => {
      try {
        const value = fn();
        if (acceptedAnswers.has(value)) {
          result += 1;
        }
      } catch (ex) {
        return;
      }
    });
  }
}

console.log(result / 2); // divide by 2 because each result was collected twice from both ends;
