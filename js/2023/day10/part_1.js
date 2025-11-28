import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2023, 10);

const parsedGrid = input.trim().split("\n");

// find coord of character `S`
const findAnimalCoords = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "S") return [i, j];
    }
  }
  return [0, 0];
};

const coords = findAnimalCoords(parsedGrid);
let currentCoords = [coords[0] + 1, coords[1]]; // initial neighbouring position to `S` is deduced manually
let counter = 0;
let previousDirection = "north";
while (true) {
  let currentChar = parsedGrid[currentCoords[0]][currentCoords[1]];
  if (previousDirection === "north" && currentChar === "|") {
    currentCoords = [currentCoords[0] + 1, currentCoords[1]];
    counter++;
    continue;
  }
  if (previousDirection === "south" && currentChar === "|") {
    currentCoords = [currentCoords[0] - 1, currentCoords[1]];
    counter++;
    continue;
  }
  if (previousDirection === "north" && currentChar === "L") {
    currentCoords = [currentCoords[0], currentCoords[1] + 1];
    counter++;
    previousDirection = "west";
    continue;
  }
  if (previousDirection === "east" && currentChar === "L") {
    currentCoords = [currentCoords[0] - 1, currentCoords[1]];
    counter++;
    previousDirection = "south";
    continue;
  }
  if (previousDirection === "west" && currentChar === "J") {
    currentCoords = [currentCoords[0] - 1, currentCoords[1]];
    counter++;
    previousDirection = "south";
    continue;
  }
  if (previousDirection === "north" && currentChar === "J") {
    currentCoords = [currentCoords[0], currentCoords[1] - 1];
    counter++;
    previousDirection = "east";
    continue;
  }
  if (previousDirection === "west" && currentChar === "7") {
    currentCoords = [currentCoords[0] + 1, currentCoords[1]];
    counter++;
    previousDirection = "north";
    continue;
  }
  if (previousDirection === "south" && currentChar === "7") {
    currentCoords = [currentCoords[0], currentCoords[1] - 1];
    counter++;
    previousDirection = "east";
    continue;
  }
  if (previousDirection === "south" && currentChar === "F") {
    currentCoords = [currentCoords[0], currentCoords[1] + 1];
    counter++;
    previousDirection = "west";
    continue;
  }
  if (previousDirection === "east" && currentChar === "F") {
    currentCoords = [currentCoords[0] + 1, currentCoords[1]];
    counter++;
    previousDirection = "north";
    continue;
  }
  if (previousDirection === "east" && currentChar === "-") {
    currentCoords = [currentCoords[0], currentCoords[1] - 1];
    counter++;
    continue;
  }
  if (previousDirection === "west" && currentChar === "-") {
    currentCoords = [currentCoords[0], currentCoords[1] + 1];
    counter++;
    continue;
  }
  if (currentChar === "S") {
    counter++;
    break;
  }
}

console.log(counter / 2);
