import { readInputFromFile } from "../../utils/misc.js";

const input = readInputFromFile(2025, 4);
const input2 = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`.trim()
const parsed = input.trim().split("\n")

const checkSurrounding = (...coords) => {
  const [y, x] = coords
  if (parsed[y][x] !== "@") return false
  const surroundings = [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x + 1],
    [y + 1, x + 1],
    [y + 1, x],
    [y + 1, x - 1],
    [y, x - 1]
  ].filter(([y, x]) => x >= 0 && y >= 0 && y < parsed.length && x < parsed[0].length)
  let count = 0
  surroundings.forEach(([y, x]) => {
    if (parsed[y][x] === "@") count++
  })
  return count <= 3
}

let count = 0
for (let i = 0; i < parsed.length; i++) {
  for (let j = 0; j < parsed[0].length; j++) {
    count = checkSurrounding(i, j) ? count + 1 : count
  }
}

console.log(count)
