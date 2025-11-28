import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2023, 14);

function getColumns(array) {
  let columns = [];
  let column = [];
  for (let j = 0; j < array[0].length; j++) {
    for (let i = 0; i < array.length; i++) {
      column.push(array[i][j]);
    }
    columns.push(column.reverse().join(""));
    column = [];
  }
  return columns;
}

function swapCharacters(str, index1, index2) {
  let charArray = str.split("");
  let temp = charArray[index1];
  charArray[index1] = charArray[index2];
  charArray[index2] = temp;
  return charArray.join("");
}

function moveColumn(column) {
  let copy = column;
  for (let i = copy.length - 2; i >= 0; i--) {
    if (copy[i] === "O" && !"O#".includes(copy[i + 1])) {
      let swapIndex = i;
      for (let j = i + 1; j < copy.length; j++) {
        if ("O#".includes(copy[j])) {
          break;
        }
        swapIndex = j;
      }
      if (swapIndex !== i) {
        copy = swapCharacters(copy, i, swapIndex);
      }
    }
  }
  return copy;
}

function shiftColumns(list) {
  const originalCols = getColumns(list);
  const shiftedCols = [];
  for (const column of originalCols) {
    shiftedCols.push(moveColumn(column));
  }

  return shiftedCols;
}

const rows = input.trim().split("\n");
const shiftedCols = shiftColumns(rows);

let sum = 0;
for (let i = 0; i < shiftedCols.length; i++) {
  for (let j = 0; j < shiftedCols[0].length; j++) {
    if (shiftedCols[i][j] === "O") {
      sum += j + 1;
    }
  }
}

console.log(sum);
