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
const parsed = input.trim().split("\n").map(l => l.split(''))
console.log(parsed)

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

const rollsCoords = () => {
  const res = []
  for (let i = 0; i < parsed.length; i++) {
    for (let j = 0; j < parsed[0].length; j++) {
      if (checkSurrounding(i, j)) {
        count++
        res.push([i, j])
      }
    }
  }
  return res
}
const updateMap = (coords) => {
  coords.forEach(([i, j]) => {
    console.log(i, j)
    parsed[i][j] = "."
  })
}

const orchestrate = () => {
  let retry = true
  while (retry) {
    const coords = rollsCoords()
    console.count(coords)
    if (coords.length === 0) break
    updateMap(coords)
  }
}

orchestrate()
console.log(count)
