import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2023, 4);

const rows = input.trim().split("\n")
const numberRegex = /\d+/g

const cardMatches = rows.map(( row ) => {
	const [_, input] = row.split(":")
	const [winningNumbers, myNumbers] = input.trim().split("|")
	const parsedWinningNumbers = winningNumbers.match(numberRegex)
	const parsedMyNumbers = myNumbers.match(numberRegex)
	
	return parsedMyNumbers.filter(myNumber => parsedWinningNumbers.some(winningNumber => winningNumber === myNumber)).length
})

const counts = Array.from({length: rows.length}).fill(1)

let res = counts.length
for(let i = 0; i < rows.length; i++){
	while(counts[i] !== 0) {
		for(let j = i + 1; j <= i + cardMatches[i]; j++){
			counts[j] += 1		
			res += 1
		}
		counts[i] -= 1
	}
}

console.log(cardMatches)
console.log(res)
