import { readInputFromFile } from "~/utils/readInputFromFile.js";

const input = readInputFromFile(2024, 4)
  .split("\n")
  .map((line) => line.split(""));

const acceptedAnswers = new Set(["XMAS", "SAMX"]);
let result = 0;

function readTo(input, x, y) {
  function east() {
    return input[x][y] + input[x][y + 1] + input[x][y + 2] + input[x][y + 3];
  }
  function south() {
    return input[x][y] + input[x + 1][y] + input[x + 2][y] + input[x + 3][y];
  }
  function west() {
    return input[x][y] + input[x][y - 1] + input[x][y - 2] + input[x][y - 3];
  }
  function north() {
    return input[x][y] + input[x - 1][y] + input[x - 2][y] + input[x - 3][y];
  }
  function northEast() {
    return (
      input[x][y] +
      input[x - 1][y + 1] +
      input[x - 2][y + 2] +
      input[x - 3][y + 3]
    );
  }
  function northWest() {
    return (
      input[x][y] +
      input[x - 1][y - 1] +
      input[x - 2][y - 2] +
      input[x - 3][y - 3]
    );
  }
  function southEast() {
    return (
      input[x][y] +
      input[x + 1][y + 1] +
      input[x + 2][y + 2] +
      input[x + 3][y + 3]
    );
  }
  function southWest() {
    return (
      input[x][y] +
      input[x + 1][y - 1] +
      input[x + 2][y - 2] +
      input[x + 3][y - 3]
    );
  }

  function concat(coords) {
    const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = coords
    return (
      input[x1][y1] +
      input[x2][y2] +
      input[x3][y3] +
      input[x4][y4]
    );
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
    console.log(i, j);
    Object.values(readTo(input, i, j)).forEach((fn) => {
      try {
        const value = fn();
        if (acceptedAnswers.has(value)) {
          console.log(value, i, j, fn);
          result += 1;
        }
      } catch (ex) {
        return;
      }
    });
  }
}

console.log(result / 2); // divide by 2 because each result was collected twice from both ends;
