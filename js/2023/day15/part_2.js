import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2023, 15);

const hashMaps = [];

/**
 * @param {string} sequence
 */
const hash = (sequence) => {
  let val = 0;
  for (let i = 0; i < sequence.length; i++) {
    val += sequence.charCodeAt(i);
    val = val * 17;
    val = val % 256;
  }
  return val;
};

/**
 * @param {string} step
 */
const parseStep = (step) => {
  const [label, operation, focalLength] = step.match(/([a-z]+)|(=|-)|(\d+)/g);
  const boxId = hash(label);
  return {
    boxId,
    label,
    operation,
    focalLength: focalLength ? parseInt(focalLength) : undefined,
  };
};

/**
 * @param {id} number
 * @returns {Map}
 */
const getOrCreateHashMap = (id) => {
  if (!hashMaps[id]) {
    hashMaps[id] = new Map();
  }
  return hashMaps[id];
};

const steps = input.trim().split(",");

for (const step of steps) {
  const { boxId, label, operation, focalLength } = parseStep(step);
  const box = getOrCreateHashMap(boxId);

  switch (operation) {
    case "=": {
      box.set(label, focalLength);
      break;
    }
    case "-": {
      if (box.has(label)) {
        box.delete(label);
      }
      break;
    }
  }
}

let sum = 0;
for (let i = 0; i < hashMaps.length; i++) {
  if (!hashMaps[i]) {
    continue;
  }
  sum +=
    (i + 1) *
    [...hashMaps[i].values()].reduce(
      (acc, val, index) => acc + val * (index + 1),
      0,
    );
}

console.log(sum);
