import input from "./input.js"

const rows = input.trim().split("\n")
const all = rows.map(row => row.split(":"))

const gamesIds = all.map(entry => entry[0])
const gamesSequence = all.map(entry => entry[1])

const regex = /(\d+ (blue|green|red))/g

const gameStats = []

gamesIds.forEach(game => {
	const id = parseInt(game.match(/\d+/g)[0])
	gameStats.push({id})
})

const games = gamesSequence.map(sequence => sequence.split(";").map(set => set.match(regex)))

games.forEach((sets, index) => {
	const localGame = gameStats[index]
	localGame.sets = {
		red: {values: [], min: 0}, 
		blue: {values: [], min: 0}, 
		green: {values: [], min: 0}
	}
	sets.flat().forEach(valueColor => {
		const [value, color] = valueColor.split(" ")
		localGame.sets[color].values.push(parseInt(value))
	})
	localGame.sets.red.min = Math.max(...localGame.sets.red.values)
	localGame.sets.blue.min = Math.max(...localGame.sets.blue.values)
	localGame.sets.green.min = Math.max(...localGame.sets.green.values)
})

console.log(gameStats.reduce((acc, stats) => acc + (stats.sets.red.min * stats.sets.blue.min * stats.sets.green.min), 0))

