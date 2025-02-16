import { readInputFromFile } from "../../utils/readInputFromFile.js";

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
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"T": 10,
	"J": 11,
	"Q": 12,
	"K": 13,
	"A": 14
}

const rows = input.trim().split("\n").map(line => line.split(" "))

const handsWithStats = rows.map(([hand, bid]) => {
	const res = {}
	const powers = []
	const cards = hand.split("")
	cards.forEach(card => {
		if(res[card]){
			res[card] += 1
		}
		else {
			res[card] = 1
		}
		powers.push(LABELS[card])
	})
	const rank = Object.values(res).reduce((acc, val) => val**2 + acc, 0)
	return { hand, res, rank, powers, bid: parseInt(bid) }
})

function sortOnRankAndPowers(arr){
	return arr.sort((a, b) => {
		// sort on rank
		if(a.rank !== b.rank){
			return a.rank - b.rank
		}

		// sort on powers
		for (let i = 0; i < a.powers.length; i++) {
		if (a.powers[i] !== b.powers[i]) {
				return a.powers[i] - b.powers[i];
			}
		}
		return 0

	})
}

const res = sortOnRankAndPowers(handsWithStats)

console.log(res.reduce((acc, val, index) => acc + val.bid * (index + 1), 0))
