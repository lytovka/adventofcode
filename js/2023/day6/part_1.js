import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2023, 6);

const [times, distances] = input
  .trim()
  .split("\n")
  .map((line) => line.match(/\d+/g).map(Number));

console.log(times, distances);

let counts = Array.from({ length: times.length }).fill(0);

for (let i = 0; i < times.length; i++) {
  let time = times[i];
  let distance = distances[i];

  for (let j = 1; j < time; j++) {
    const localDistance = j * (time - j);
    if (localDistance > distance) {
      counts[i] += 1;
    }
  }
}

console.log(counts.reduce((acc, val) => acc * val, 1));
