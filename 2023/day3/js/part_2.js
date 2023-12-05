import input from "./input.js"

const rows = input.trim().split("\n")
const numberRegex = /\d+/g
const asteriskRegex = /\*/g 

const partNumbers = []

const rowsStats = rows.map(row => {
	const numberMatches = [...row.matchAll(numberRegex)]
	const symbolMatches = [...row.matchAll(asteriskRegex)]

	return {
		values: { numbers: numberMatches.map(match => match[0]) },
		startIndicies: { numbers: numberMatches.map(match => match.index), symbols: symbolMatches.map(match => match.index)},
		endIndicies: { numbers: numberMatches.map(match => match[0].length + match.index - 1)}
	}
})

rowsStats.forEach((line, lIndex) => {
	const surroundedNumbers = line.values.numbers.filter((_, index) => isNumberSurroundedBySymbol(lIndex, line.startIndicies.numbers[index], line.endIndicies.numbers[index]))	
	partNumbers.push(...surroundedNumbers)
})

console.log(partNumbers.reduce((acc, val) => acc + parseInt(val), 0))
