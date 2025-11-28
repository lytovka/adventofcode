import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2023, 2);

const gameEntries = input
  .trim()
  .split("\n")
  .map((row) => row.split(":"));
const sequenceRegex = /(\d+ (blue|green|red))/g;

const gameStats = gameEntries.map(([id, sequence]) => {
  const gameId = parseInt(id.match(/\d+/g)[0]);
  const setCombo = sequence.split(";").map((set) => set.match(sequenceRegex));

  const setsStats = setCombo.map((cubes) => {
    const colorStats = { red: 0, blue: 0, green: 0 };
    cubes.forEach((valueColor) => {
      const [value, color] = valueColor.split(" ");
      colorStats[color] += parseInt(value);
    });
    return colorStats;
  });
  return { id: gameId, sets: setsStats };
});

const filteredRes = gameStats.filter((game) =>
  game.sets.every((set) => set.red <= 12 && set.green <= 13 && set.blue <= 14),
);

console.log(filteredRes.reduce((acc, obj) => acc + obj.id, 0));
