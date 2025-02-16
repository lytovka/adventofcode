import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2023, 2);

const gameEntries = input.trim().split("\n").map(row => row.split(":"))
const sequenceRegex = /(\d+ (blue|green|red))/g

const gameStats = gameEntries.map(([id, sequence]) => {
	const gameId = parseInt(id.match(/\d+/g)[0])
	const sets = sequence.split(';').map(set => set.match(sequenceRegex))
	const colors = {red: [], blue: [], green: []}

	sets.flat().forEach(valueColor => {
		const [value, color] = valueColor.split(" ")
		colors[color].push(parseInt(value))
	})

	return {
		id: gameId,
		sets: {
			red: {values: colors.red, min: Math.max(...colors.red)},
			blue: {values: colors.blue, min: Math.max(...colors.blue)},
			green: {values: colors.green, min: Math.max(...colors.green)},
		}
	}

})

console.log(gameStats.reduce((acc, stats) => acc + (stats.sets.red.min * stats.sets.blue.min * stats.sets.green.min), 0))

