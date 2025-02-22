import { readInputFromFile } from "~/utils/readInputFromFile.js";

const input = readInputFromFile(2024, 4).split("\n");
const acceptedAnswer = new Set(["MAS", "SAM"]);

function readTo(input, x, y) {
  function northEast() {
    return concat([x - 1, y + 1], [x, y], [x + 1, y - 1]);
  }
  function northWest() {
    return concat([x - 1, y - 1], [x, y], [x + 1, y + 1]);
  }
  function concat(...coords) {
    const [[x1, y1], [x2, y2], [x3, y3]] = coords;
    return input[x1][y1] + input[x2][y2] + input[x3][y3];
  }
  return { northEast, northWest };
}

let result = 0;
for (let i = 1; i < input.length - 1; i++) {
  for (let j = 1; j < input.length - 1; j++) {
    try {
      const values = Object.values(readTo(input, i, j)).map((fn) => fn());
      if (values.every((el) => acceptedAnswer.has(el))) {
        result += 1;
      }
    } catch (err) {
      continue;
    }
  }
}

console.log(result);
