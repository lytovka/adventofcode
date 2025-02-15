import input from "./input.js";

const rows = input.trim().split("\n");

let total = (rows.length + rows[0].length) * 2 - 4;

for (let i = 1; i < rows.length - 1; i++) {
  for (let j = 1; j < rows[0].length - 1; j++) {
    let isTaller1 = true;
    let isTaller2 = true;
    let isTaller3 = true;
    let isTaller4 = true;

    // left
    for (let k = j - 1; k >= 0; k--) {
      if (rows[i][k] >= rows[i][j]) {
        isTaller1 = false;
        break;
      }
    }

    // top
    for (let k = i - 1; k >= 0; k--) {
      if (rows[k][j] >= rows[i][j]) {
        isTaller2 = false;
        break;
      }
    }

    // right
    for (let k = j + 1; k < rows.length; k++) {
      if (rows[i][k] >= rows[i][j]) {
        isTaller3 = false;
        break;
      }
    }

    // bottom
    for (let k = i + 1; k < rows[0].length; k++) {
      if (rows[k][j] >= rows[i][j]) {
        isTaller4 = false;
        break;
      }
    }
    if (isTaller1 || isTaller2 || isTaller3 || isTaller4) {
      total += 1;
    }
  }
}

console.log(total);
