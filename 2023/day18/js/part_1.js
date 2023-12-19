import {input, input1} from "./input.js"

const rows = input.trim().split("\n").map(line => line.split(" "))

const coords = [[0,0]]

let sum1 = 0
for(const row of rows){
	const [direction, strSteps] = row
	const steps = parseInt(strSteps)
	const prevCoord = coords.at(-1)
	switch(direction) {
		case "U": {
			const newCoord = [prevCoord[0] - steps, prevCoord[1]]
			coords.push(newCoord)
			break;
		}
		case "L": {
			const newCoord = [prevCoord[0], prevCoord[1] - steps]
			coords.push(newCoord)
			break;
		}
		case "R": {
			const newCoord = [prevCoord[0], prevCoord[1] + steps]
			coords.push(newCoord)
			break;
		}
		case "D": {
			const newCoord = [prevCoord[0] + steps, prevCoord[1]]
			coords.push(newCoord)
			break;
		}
	}
	sum1 += steps
}

coords.pop()

let sum = 0
for(let i = 0; i < coords.length - 1; i++) {
	const [x1, y1] = coords[i]
	const [x2, y2] = coords[i+1]
	const diff = (x1 * y2) - (x2 * y1)
	sum += diff 
}

console.log((sum1 + Math.abs(sum)) / 2 + 1)
