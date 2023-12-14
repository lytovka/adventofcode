import {input, input1, input2 } from "./input.js"

const compareSegments = (topSegment, bottomSegment) => {
	// console.log(topSegment)
	// console.log(bottomSegment)
	let topLength = topSegment.length
	let currentCount = 0
	let longestCount = 0
	let j = 0
	for (let i = topLength - 1; i >= 0; i--){
		if(topSegment[i] === bottomSegment[j]) {
			currentCount++
		}
		if(topSegment[i] !== bottomSegment[j]){
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

	// console.log(longestCount)
	// console.log("----")
	return longestCount;
}

const findBestHorizontalMirror = (pattern) => {
	const rows = pattern.length
	let bestScore = 0
	let rowsAbove = 0
	for(let i = 1; i < rows - 1; i++){
		let topSegment = pattern.slice(0, i)
		let bottomSegment = pattern.slice(i, rows)
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
    // Loop through each row and get the element at columnIndex
    for (let i = 0; i < array.length; i++) {
        column.push(array[i][columnIndex]);
    }
    // Join the elements into a string
    return column.join('');
}

const findBestVerticalMirror = (pattern) => {
	const cols = pattern[0].length
	let bestScore = 0
	let colsLeft = 0
	let columns = []

	for(let i = 0; i < cols - 1; i++){
		columns.push(getColumnAsString(pattern, i))
	}
	for(let i = 1; i < cols - 1; i++){
		let leftSegment = columns.slice(0, i)
		let rightSegment = columns.slice(i, cols)
		let currentScore = compareSegments(leftSegment, rightSegment)
		if(currentScore >= bestScore){
			bestScore = currentScore 
			colsLeft = leftSegment.length
		}
	}
	return {bestScore, colsLeft}

}

const patterns = input1.trim().split("\n\n")

const bestScores = []
for(const pattern of patterns){
	const ps = pattern.split("\n") 
	const statsHorizontal = findBestHorizontalMirror(ps)
	const statsVertical = findBestVerticalMirror(ps)
	console.log(statsHorizontal)
	console.log(statsVertical)
	const best = statsVertical.bestScore > statsHorizontal.bestScore ? statsVertical : statsHorizontal
	console.log(best)
	console.log("-------")
	bestScores.push(best)
}

console.log(bestScores.filter(val => val.colsLeft).reduce((acc, val) => acc + val.colsLeft, 0) + 100 * bestScores.filter(val => val.rowsAbove).reduce((acc, val) => acc + val.rowsAbove, 0))

