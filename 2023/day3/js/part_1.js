import input from "./input.js"

const rows = input.trim().split("\n")
const numberRegex = /\d+/g
const nonNumbersAndNonDots = /[^0-9.]/g 

const partNumbers = []

const rowsStats = rows.map(row => {
	const numberMatches = [...row.matchAll(numberRegex)]
	const symbolMatches = [...row.matchAll(nonNumbersAndNonDots)]

	return {
		values: { numbers: numberMatches.map(match => match[0]), symbols: symbolMatches.map(match => match[0])},
		startIndicies: { numbers: numberMatches.map(match => match.index),  symbols: symbolMatches.map(match => match.index)  },
		endIndicies: { numbers: numberMatches.map(match => match[0].length + match.index - 1)}
	}
})

const isNumberSurroundedBySymbol = (index, numberStartIndex, numberEndIndex) => {
	const symbolsCurrentRow = rowsStats[index].startIndicies.symbols
	const symbolsAboveRow = index > 0 ? rowsStats[index - 1].startIndicies.symbols : []
	const symbolsBelowRow = index < rowsStats.length - 1 ? rowsStats[index + 1].startIndicies.symbols : []

	return symbolsCurrentRow.some(symbolIndex => symbolIndex + 1 === numberStartIndex || symbolIndex - 1 === numberEndIndex) ||
		symbolsAboveRow.some(symbolIndex => symbolIndex >= numberStartIndex - 1 && symbolIndex <= numberEndIndex + 1) ||
		symbolsBelowRow.some(symbolIndex => symbolIndex >= numberStartIndex - 1 && symbolIndex <= numberEndIndex + 1)

}

rowsStats.forEach((line, lIndex) => {
	const surroundedNumbers = line.values.numbers.filter((_, index) => isNumberSurroundedBySymbol(lIndex, line.startIndicies.numbers[index], line.endIndicies.numbers[index]))	
	partNumbers.push(...surroundedNumbers)
})

console.log(partNumbers.reduce((acc, val) => acc + parseInt(val), 0))
