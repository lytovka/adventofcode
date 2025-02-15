import {input} from "./input.js"

/**
 * @param {string} sequence
 */
const hash = (sequence) => {
	let val = 0
	for(let i = 0; i < sequence.length; i++){
		val += sequence.charCodeAt(i)
		val = val * 17
		val = val % 256
	}
	return val
}

const steps = input.trim().split(",")
const sums = steps.map(hash)
console.log(sums.reduce((acc, val) => acc + val, 0))
