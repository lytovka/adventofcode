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
	localGame.sets = []
	sets.forEach((set, sindex) => {
		localGame.sets[sindex] = {red: 0, blue: 0, green: 0}
		set.forEach(cubes => {
			const [value, color] = cubes.split(" ")
			localGame.sets[sindex][color] += parseInt(value)
		});
	})
})

const filteredRes = gameStats.filter(game => game.sets.every(set => set.red <= 12 && set.green <= 13 && set.blue <= 14))

console.log(filteredRes.reduce((acc, obj) => acc + obj.id, 0))

