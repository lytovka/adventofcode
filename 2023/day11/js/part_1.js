import {input1, input} from "./input.js"

const expandGrid = (grid) => {
	// expand rows
	const gridCopy = [...grid]
	const expandedRow = ".".repeat(grid[0].length)
	for(let i = 0; i < grid.length; i++){
		if(!(/#/.test(grid[i]))){
			gridCopy.splice(gridCopy.length - grid.length + i, 0, expandedRow)
		}
	}

	//expand columns
	for(let i = 0; i < grid[0].length; i++){
		let needToExpand = true
		for(let j = 0; j < grid.length; j++) {
			if(grid[j][i] !== "."){
				needToExpand = false
				break;
			}
		}
		if(needToExpand){
			console.log("here ", i)
			for(let j = 0; j < gridCopy.length; j++){
				const newPosition = gridCopy[j].length - grid[0].length + i
				gridCopy[j] = gridCopy[j].slice(0, newPosition) + "." + gridCopy[j].slice(newPosition)
			}
		}
	}	

	return gridCopy 
}

const findGalaxiesCoordinates = (expandedGrid) => {
	const coords = []

	for(let i = 0; i < expandedGrid.length; i++){
		for(let j = 0; j < expandedGrid[0].length; j++){
			if(expandedGrid[i][j] === "#"){
				coords.push([i, j])
			}
		}
	}
	return coords
}

const manhattanDistance = (coord1, coord2) => {
	return Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1])
}

const permuteAndOperate = (coordinates) => {
	const pairsMap = new Map()
	for(let i = 0; i < coordinates.length; i++){
		for(let j = i + 1; j < coordinates.length; j++){
			const pair = [coordinates[i], coordinates[j]].sort()
			const pairKey = pair.join(",")

			if(!pairsMap.has(pairKey)){
				const shortestDistance = manhattanDistance(...pair)
				pairsMap.set(pairKey, shortestDistance)
			}
		}
	}
	return pairsMap
}

const rows = input.trim().split("\n")

const expandedGrid = expandGrid(rows)
console.log(expandedGrid.join("\n"))
const allCoords = findGalaxiesCoordinates(expandedGrid)
const m = permuteAndOperate(allCoords)

console.log([...m.values()].reduce((acc, val) => acc + val, 0))
