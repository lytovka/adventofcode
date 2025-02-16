import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2023, 11);

const findExpansionVectors = (grid) => {
	const expandX = grid.map((row) => (/#/.test(row) ? 0 : 1));
	const expandY = grid[0].split("").map((_, colIndex) =>
		grid.every((row) => row[colIndex] === ".") ? 1 : 0
	);
	return [expandX, expandY];
};

const findGalaxiesCoordinates = (grid) => {
	const coords = []
	for(let i = 0; i < grid.length; i++){
		for(let j = 0; j < grid[0].length; j++){
		if(grid[i][j] === "#"){
				coords.push([i,j])
			}			
		}
	}
	return coords	
} 

const manhattanDistance = (coord1, coord2) => {
	const [x1, y1] = coord1;
	const [x2, y2] = coord2;
	return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const findScaledCoordinates = (coords, expansionMap, scale) => {
	const [expX, expY] = expansionMap;
	const countX = expX.slice(0, coords[0]).reduce((sum, val) => sum + val, 0);
	const countY = expY.slice(0, coords[1]).reduce((sum, val) => sum + val, 0);
	return [coords[0] + countX * (scale - 1), coords[1] + countY * (scale - 1)];
};

const permuteAndOperate = (coordinates, expansionMap, scale) => {
	const pairsMap = new Map()
	for(let i = 0; i < coordinates.length; i++){
		for(let j = i + 1; j < coordinates.length; j++){
			const scaledCoord1 = findScaledCoordinates(coordinates[i], expansionMap, scale)
			const scaledCoord2 = findScaledCoordinates(coordinates[j], expansionMap, scale)
			const pair = [scaledCoord1, scaledCoord2].sort()
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
const [expX, expY] = findExpansionVectors(rows)
const galaxiesCoords = findGalaxiesCoordinates(rows)
const m1 = permuteAndOperate(galaxiesCoords, [expX, expY], 2)
const m2 = permuteAndOperate(galaxiesCoords, [expX, expY], 1_000_000)

console.log([...m1.values()].reduce((acc, val) => acc + val, 0))
console.log([...m2.values()].reduce((acc, val) => acc + val, 0))
