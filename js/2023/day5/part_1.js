import { readInputFromFile } from "~/utils/readInputFromFile.js";

const input = readInputFromFile(2023, 5);

const [initialSeeds, ...maps] = input.trim().split("\n\n");

const parsedInitialSeeds = initialSeeds
  .split(":")[1]
  .split(" ")
  .filter(Boolean)
  .map((a) => parseInt(a));

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
console.log(mapsParsed);
let minVal = Number.MAX_SAFE_INTEGER;
for (let val of parsedInitialSeeds) {
  let currentVal = val;
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

console.log(minVal);
