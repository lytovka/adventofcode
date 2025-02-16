import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2023, 3);

const rows = input1.trim().split("\n")
const numberRegex = /\d+/g
const asteriskRegex = /\*/g 

const rowsStats = rows.map(row => {
	const numberMatches = [...row.matchAll(numberRegex)]
	const symbolMatches = [...row.matchAll(asteriskRegex)]

	return {
		values: { numbers: numberMatches.map(match => match[0]) },
		startIndicies: { numbers: numberMatches.map(match => match.index), symbols: symbolMatches.map(match => match.index)},
		endIndicies: { numbers: numberMatches.map(match => match[0].length + match.index - 1)}
	}
})

console.log(rows)
console.log(rowsStats)
