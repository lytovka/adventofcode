import input from "./input.js"

const rows = input.trim().split("\n")
const numberRegex = /\d+/g

const cardMatches = rows.map(row => {
	const [_, input] = row.split(":")
	const [winningNumbers, myNumbers] = input.trim().split("|")
	const parsedWinningNumbers = winningNumbers.match(numberRegex)
	const parsedMyNumbers = myNumbers.match(numberRegex)

	return parsedMyNumbers.filter(myNumber => parsedWinningNumbers.some(winningNumber => winningNumber === myNumber))
})

console.log(cardMatches)
console.log(cardMatches.map(matches => matches.length > 0 ? 1 << matches.length - 1 : 0).reduce((acc, val) => acc + val, 0))
