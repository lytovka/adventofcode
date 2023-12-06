import {input, input1} from "./input.js"

const [initialSeeds, ...maps] = input.trim().split("\n\n");
console.log(maps)
console.log(maps.length)

const parsedInitialSeeds = initialSeeds.split(":")[1].split(" ").filter(Boolean).map(a => parseInt(a));

let mapsArray = Array.from({ length: maps.length }, () => new Map());

maps.forEach((mapString, index) => {
	const mapLines = mapString.split(":")[1].split("\n").filter(Boolean);
	parseAndSetMap(mapsArray[index], mapLines);
});

function parseAndSetMap(map, mapLines) {
	mapLines.map(aMap => {
		const [destination, source, range] = aMap.split(" ").map(Number);
		console.log(destination, source, range)
		for (let i = 0; i < range; i++) {
			const currentKey = source + i;
			const currentValue = destination + i;
			map.set(currentKey, currentValue);
		}
	});
}

function getOrSetIfAbsent(map, key) {
	if (!map.has(key)) {
		map.set(key, key);
		return key;
	}
	return map.get(key);
}

function chainGetOrSetIfAbsent(maps, initialKey) {
	const res = [initialKey]
	let currentKey = initialKey
	for (let i = 0; i < maps.length; i++) {
		const value = getOrSetIfAbsent(maps[i], currentKey)
		res.push(value);
		currentKey = value
	}
	return res;
}

const locations = parsedInitialSeeds.map(initialSeed => chainGetOrSetIfAbsent(mapsArray, initialSeed).at(-1))

console.log(Math.min(...locations))

