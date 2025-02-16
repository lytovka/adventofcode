import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2023, 5);

const [initialSeeds, ...maps] = input1.trim().split("\n\n");

const parsedInitialSeeds = initialSeeds
  .split(":")[1]
  .split(" ")
  .filter(Boolean)
  .map((a) => parseInt(a));

let seeds = [];

for (let i = 1; i < parsedInitialSeeds.length; i += 2) {
  seeds.push([parsedInitialSeeds[i - 1], parsedInitialSeeds[i]]);
}

console.log(seeds);

function parseAndSetMaps(mapLines) {
  const mapLinesParsed = mapLines.split(":")[1].split("\n").filter(Boolean);
  return mapLinesParsed.map((aMap) => {
    const [destination, source, range] = aMap.split(" ").map(Number);
    return {
      source,
      destination,
      sourceEnd: source + range - 1,
    };
  });
}

const mapsParsed = maps.map((mapLines) => parseAndSetMaps(mapLines));

function fromSeedToLocationValue(seedStart, range) {
  let minVal = Number.MAX_SAFE_INTEGER;
  let length = seedStart + range;
  for (let i = seedStart; i < length; i++) {
    let currentVal = i;
    for (let map of mapsParsed) {
      for (let m of map) {
        if (currentVal >= m.source && currentVal <= m.sourceEnd) {
          currentVal = m.destination + (currentVal - m.source);
          break;
        }
      }
    }
    if (currentVal < minVal) {
      minVal = currentVal;
    }
  }
  return minVal;
}

console.log(
  Math.min(...seeds.map((input) => fromSeedToLocationValue(...input))),
);

// 90229602
// 60568880
// 2036266413
// 289863851
// 554772016
