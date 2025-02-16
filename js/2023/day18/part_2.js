import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2023, 18);

const DIRECTIONS = {
	"0": "R",
	"1": "D",
	"2": "L",
	"3": "U"
}

const rows = input.trim().split("\n").map(line => line.split(" "))

const coords = [[0,0]]

let sum1 = 0
for(const row of rows){
	const [,, hex] = row
	console.log(hex)
	const stepsString = hex.slice(2, 7)
	const steps = parseInt(stepsString, 16)
	const direction = DIRECTIONS[hex[7]]
	console.log(steps, direction)	
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
