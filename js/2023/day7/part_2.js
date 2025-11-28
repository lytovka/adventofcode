import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2023, 7);

/*
 * 5 -> high card
 * 7 -> one pair
 * 9 -> two pair
 * 11 -> three of a kind
 * 13 -> full house
 * 17 -> four of a kind
 * 25 -> five of a kind
 */

const LABELS = {
  J: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  Q: 11,
  K: 12,
  A: 13,
};

const calculateRank = (freq) =>
  Object.values(freq).reduce((acc, val) => val ** 2 + acc, 0);

const rows = input
  .trim()
  .split("\n")
  .map((line) => line.split(" "));

const handsWithStatsBeforeJoker = rows.map(([hand, bid]) => {
  const frequencies = {};
  const powers = [];
  const cards = hand.split("");
  cards.forEach((card) => {
    frequencies[card] = (frequencies[card] || 0) + 1;
    powers.push(LABELS[card]);
  });
  return {
    hand,
    frequencies,
    rank: calculateRank(frequencies),
    powers,
    bid: parseInt(bid),
  };
});

const handsWithStats = handsWithStatsBeforeJoker.map((hand) => {
  const { frequencies } = hand;
  let maxKey = "J";
  let maxValue = -Infinity;
  let numberOfJokers = hand.hand.match(/J/g);

  if (Array.isArray(numberOfJokers) && numberOfJokers.length > 0) {
    for (let [key, value] of Object.entries(frequencies)) {
      if (key === "J") continue;
      if (value > maxValue) {
        maxValue = value;
        maxKey = key;
      } else if (value === maxValue) {
        if (LABELS[key] > LABELS[maxKey]) {
          maxKey = key;
        }
      }
    }
    if (numberOfJokers.length !== 5) {
      frequencies[maxKey] += numberOfJokers.length;
      delete frequencies["J"];
    }
    return { ...hand, rank: calculateRank(frequencies) };
  }

  return hand;
});

function sortOnRankAndPowers(arr) {
  return arr.sort((a, b) => {
    // sort on rank
    if (a.rank !== b.rank) {
      return a.rank - b.rank;
    }

    // sort on powers
    for (let i = 0; i < a.powers.length; i++) {
      if (a.powers[i] !== b.powers[i]) {
        return a.powers[i] - b.powers[i];
      }
    }
    return 0;
  });
}

const frequencies = sortOnRankAndPowers(handsWithStats);
console.log(
  frequencies.reduce((acc, val, index) => acc + val.bid * (index + 1), 0),
);
