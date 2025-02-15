// This is not a right solution
/
import {input2, input} from "./input.js"

const [sequenceRaw, directionMapsRaw] = input2.trim().split("\n\n")

const sequence = sequenceRaw.split("")
const directionMap = new Map()
directionMapsRaw.split("\n").forEach((map) => {
	const [start, possibleDirection] = map.split(" = ")
	const [left, right] = possibleDirection.match(/[A-Z]{3}/g)
	directionMap.set(start, [left, right])
})

let currentSteps = [...directionMap.keys()]


let counter = 0
let current = "AAA"
const ic = sequence.length
while(current !== "ZZZ"){
	const instruction = sequence[counter % ic] === 'L' ? 0 : 1; 
	current = directionMap.get(current)[instruction]
	counter++
}

console.log(counter)


