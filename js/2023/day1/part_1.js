import input from "./input.js"

const columns = input.trim().split("\n")

const numbers = columns.map(c => {
	const numbers = c.split('').filter(Number)
	return parseInt(numbers.at(0) + numbers.at(-1), 10)
})


const sum = numbers.reduce((acc, n) => acc + n)

console.log(sum)
