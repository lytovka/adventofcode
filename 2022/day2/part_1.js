import { readFileSync } from "fs";
import { resolve } from "path";

const winLoseDrawScores = {
  WIN: 6,
  DRAW: 3,
  LOSE: 0,
};

const opponentScores = {
  A: 1, //rock
  B: 2, //paper
  C: 3, //scissors
};

const myScores = {
  X: 1, //rock
  Y: 2, //paper,
  Z: 3, //scissors
};

const opponentWinningRules = {
  A: "Z",
  B: "X",
  C: "Y",
};

const myWinningRules = {
  X: "C",
  Y: "A",
  Z: "B",
};

const input = readFileSync(resolve("input.txt"), "utf-8");
const rounds = input
  .trim()
  .split("\n")
  .map((round) => round.split(" "));

const winLoseDrawStats = rounds.map(([oppSelection, mySelection]) => {
  // we chose the same element
  if (myScores[mySelection] == opponentScores[oppSelection])
    return ["DRAW", mySelection];
  // the opponent is winning
  else if (opponentWinningRules[oppSelection] == mySelection)
    return ["LOSE", mySelection];
  // I am are winning
  else if (myWinningRules[mySelection] == oppSelection)
    return ["WIN", mySelection];
});

const scores = winLoseDrawStats.map(
  ([outcome, mySelection]) => winLoseDrawScores[outcome] + myScores[mySelection]
);
const totalScore = scores.reduce((acc, score) => acc + score);

console.log(totalScore);

