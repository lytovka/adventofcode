import { readInputFromFile } from "~/utils/readInputFromFile.js";

const input = readInputFromFile(2022, 2);

const winLoseDrawScores = {
  WIN: 6,
  DRAW: 3,
  LOSE: 0,
};

const elementScores = {
  A: 1, //rock
  B: 2, //paper
  C: 3, //scissors
};

const winningMapping = {
  A: "B",
  B: "C",
  C: "A",
};

const losingMapping = {
  A: "C",
  B: "A",
  C: "B",
};

const rounds = input
  .trim()
  .split("\n")
  .map((round) => round.split(" "));

console.log(rounds);

const winLoseDrawStats = rounds.map(([oppSelection, desiredOutcome]) => {
  if (desiredOutcome === "X") return ["LOSE", losingMapping[oppSelection]];
  if (desiredOutcome === "Y") return ["DRAW", oppSelection];
  if (desiredOutcome === "Z") return ["WIN", winningMapping[oppSelection]];
});

const scores = winLoseDrawStats.map(
  ([outcome, mySelection]) =>
    winLoseDrawScores[outcome] + elementScores[mySelection],
);
const totalScore = scores.reduce((acc, score) => acc + score);

console.log(totalScore);
