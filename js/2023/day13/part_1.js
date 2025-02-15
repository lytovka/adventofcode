import {input, input1, input2 } from "./input.js"

const compareSegments = (segment1, segment2) => {
	let topLength = segment1.length
	let currentCount = 0
	let longestCount = 0
	let j = 0
	for (let i = topLength - 1; i >= 0; i--){
		if(segment1[i] === segment2[j]) {
			currentCount++
		}
		else {	
			if(currentCount > longestCount){
				longestCount = currentCount
			}
			currentCount = 0
		}
		j++
	}
	if (currentCount > longestCount) {
		longestCount = currentCount;
	}

	console.log(segment1)
	console.log(segment2)
	console.log(longestCount)
	return longestCount;
}

const findBestHorizontalMirror = (pattern) => {
	const rows = pattern.length
	let bestScore = 0
	let rowsAbove = 0
	for(let i = 0; i < rows; i++){
		let topSegment = pattern.slice(0, i)
		let bottomSegment = pattern.slice(i, rows + 1)
		let currentScore = compareSegments(topSegment, bottomSegment)
		if(currentScore >= bestScore){
			bestScore = currentScore 
			rowsAbove = i 
		}
	}
	return {bestScore, rowsAbove}
}

function getColumnAsString(array, columnIndex) {
    let column = [];
    for (let i = 0; i < array.length; i++) {
        column.push(array[i][columnIndex]);
    }
    return column.join('');
}

const findBestVerticalMirror = (pattern) => {
	const cols = pattern[0].length
	let bestScore = 0
	let colsLeft = 0
	let columns = []

	for(let i = 0; i < cols; i++){
		columns.push(getColumnAsString(pattern, i))
	}
	console.log("COLUMNS")
	console.log(columns)
	for(let i = 0; i < cols; i++){
		let leftSegment = columns.slice(0, i)
		let rightSegment = columns.slice(i, cols + 1)
		let currentScore = compareSegments(leftSegment, rightSegment)
		console.log(currentScore)
		if(currentScore >= bestScore && i >= colsLeft){
			bestScore = currentScore 
			colsLeft = i
			console.log("BEST", colsLeft)
		}
	}
	return {bestScore, colsLeft}

}

const patterns = input2.trim().split("\n\n")

const bestScores = []
for(const pattern of patterns){
	const ps = pattern.split("\n") 
	const statsHorizontal = findBestHorizontalMirror(ps)
	const statsVertical = findBestVerticalMirror(ps)
	console.log(statsHorizontal)
	console.log(statsVertical)
	const best = statsVertical.bestScore >= statsHorizontal.bestScore ? statsVertical : statsHorizontal
	console.log(best)
	console.log("-------")
	bestScores.push(best)
}

console.log(bestScores.filter(val => val.colsLeft).reduce((acc, val) => acc + val.colsLeft, 0) + 100 * bestScores.filter(val => val.rowsAbove).reduce((acc, val) => acc + val.rowsAbove, 0))

