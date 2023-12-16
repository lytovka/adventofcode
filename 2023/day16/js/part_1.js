import {input, input1} from "./input.js"
import crypto from "node:crypto"


/**
 * @param {string[]} contraption
 * @param {number[][]} initPos
 */
const getEnergizedTiles = (contraption, initPos) => {
	const beamsMap = new Map([[crypto.randomUUID(), initPos]])
	const energizedTiles = new Map()

	for (const [id, value] of beamsMap){
		const [[bRow, bCol], [dRow, dCol]] = value
		console.log(energizedTiles.size)
		console.log(value)
		const tile = contraption[bRow][bCol]

		if(energizedTiles.has([bRow, bCol].toString())){
			console.log("deleting!")
			beamsMap.delete(id)
			continue;
		}

		if(dRow === 0 && dCol === 0){
			beamsMap.set(crypto.randomUUID(), [[bRow, bCol + 1], [0, 1]])			
			energizedTiles.set([bRow,bCol].toString(), value)	
			beamsMap.delete(id)
			continue;
		}
		if(tile === "."){
			if(bRow > 0 && bRow < contraption.length - 1 && bCol > 0 && bCol < contraption[bRow].length - 1){
				beamsMap.set(crypto.randomUUID(), [[bRow + dRow, bCol + dCol], [dRow, dCol]])
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
		}
		if(tile === "|") {
			// approached from either left or right
			if (dCol === 1 || dCol === -1){
				if(bRow > 0){
					beamsMap.set(crypto.randomUUID(), [[bRow - 1, bCol], [-1, 0]])
				}
				if(bRow < contraption.length - 1){
					beamsMap.set(crypto.randomUUID(), [[bRow + 1, bCol], [1, 0]])
				}
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
			// approached from top
			if (dRow === 1){
				if(bRow > 0){
					beamsMap.set(crypto.randomUUID(), [[bRow + 1, bCol], [1, 0]])
					energizedTiles.set([bRow,bCol].toString(), value)	
					beamsMap.delete(id)
					continue;
				}
			}
			// approached from bottom
			if (dRow === 0){
				if(bRow < contraption.length - 1){
					beamsMap.set(crypto.randomUUID(), [[bRow - 1, bCol], [-1, 0]])
					energizedTiles.set([bRow,bCol].toString(), value)	
					beamsMap.delete(id)
					continue;
				}
			}
		}
		if(tile === "\\") {
			// approached from left
			if(dCol === 1 && bRow < contraption.length - 1) {
				beamsMap.set(crypto.randomUUID(), [[bRow + 1, bCol], [1, 0]])
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
			// approached from right
			if(dCol === -1 && bRow > 0){
				beamsMap.set(crypto.randomUUID(), [[bRow - 1, bCol], [-1, 0]])
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
			// approached from top
			if(dRow === 1 && bCol < contraption[bRow].length - 1){
				beamsMap.set(crypto.randomUUID(), [[bRow, bCol + 1], [0, 1]])
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
			// approached from bottom
			if(dRow === -1 && bCol > 0){
				beamsMap.set(crypto.randomUUID(), [[bRow, bCol - 1], [0, -1]])
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
			// approached from top
			if(dRow === 1 && bCol > 0){
				beamsMap.set(crypto.randomUUID(), [[bRow, bCol - 1], [0, -1]])
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
		}

		if(tile === "/"){
			// approached from left
			if(dCol === 1 && bRow > 0){
				beamsMap.set(crypto.randomUUID(), [[bRow - 1, bCol], [-1, 0]])
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
			// approached from bottom
			if(dRow === -1 && bCol < contraption[bRow].length - 1){
				beamsMap.set(crypto.randomUUID(), [[bRow, bCol + 1], [0, 1]])
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
			// approached from right
			if(dCol === -1 && bRow < contraption.length - 1){
				beamsMap.set(crypto.randomUUID(), [[bRow + 1, bCol], [1, 0]])
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
			// approached from top
			if(dRow === 1 && bCol > 0){
				beamsMap.set(crypto.randomUUID(), [[bRow, bCol - 1], [0, -1]])
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
		}

		if(tile === "-"){
			// approached from either top or bottom
			if(dRow == 1 || dRow === -1) {
				if(bCol > 0){
					beamsMap.set(crypto.randomUUID(), [[bRow, bCol -1], [0, -1]])
				}
				if(bCol < contraption[bRow].length - 1){
					beamsMap.set(crypto.randomUUID(), [[bRow, bCol + 1], [0, 1]])
				}
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
			// approached from either left 
			if(dCol == 1 && bCol < contraption[dCol].length - 1) {
				beamsMap.set(crypto.randomUUID(), [[bRow, bCol + 1], [0, 1]])
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
			if(dCol == -1 && bCol > 0) {
				beamsMap.set(crypto.randomUUID(), [[bRow, bCol - 1], [0, -1]])
				energizedTiles.set([bRow,bCol].toString(), value)	
				beamsMap.delete(id)
				continue;
			}
		}
	}

	return energizedTiles
}

const rows = input1.trim().split("\n")

console.log(getEnergizedTiles(rows, [[0,0], [0,0]]))


