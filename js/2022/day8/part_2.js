import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2022, 8);

const rows = input.trim().split("\n");

let scenicScores = [];

for (let i = 1; i < rows.length - 1; i++) {
  for (let j = 1; j < rows[i].length - 1; j++) {
    let scenicLeft = 0;
    let scenicTop = 0;
    let scenicRight = 0;
    let scenicBottom = 0;

    // left
    for (let k = j - 1; k >= 0; k--) {
      scenicLeft += 1;
      if (rows[i][k] >= rows[i][j]) {
        break;
      }
    }

    // top
    for (let k = i - 1; k >= 0; k--) {
      scenicTop += 1;
      if (rows[k][j] >= rows[i][j]) {
        break;
      }
    }

    // right
    for (let k = j + 1; k < rows.length; k++) {
      scenicRight += 1;
      if (rows[i][k] >= rows[i][j]) {
        break;
      }
    }

    // bottom
    for (let k = i + 1; k < rows[0].length; k++) {
      scenicBottom += 1;
      if (rows[k][j] >= rows[i][j]) {
        break;
      }
    }

    scenicScores.push(scenicLeft * scenicRight * scenicBottom * scenicTop);
  }
}

console.log(scenicScores);
console.log(Math.max(...scenicScores));
