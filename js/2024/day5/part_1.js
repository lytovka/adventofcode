import { readInputFromFile } from "~/utils/readInputFromFile.js";

function isNonIncreasing(arr) {
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] > arr[i - 1]) {
			return false;
		}
	}
	return true;
}

const [priorities, sequences] = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`.trim().split("\n\n");

const priorityMap = new Map()

console.log(priorities)
const priorityNumbers = priorities.trim().split("\n").map(line => line.split("|").map(Number))
const sequenceParsed = sequences.split("\n").map(line => line.split(",").map(Number))

priorityNumbers.forEach(([prev, next]) => {
	const existing = priorityMap.get(prev)
	priorityMap.set(prev, existing ? [...existing, next] : [next])
})
priorityMap.forEach((value, key) => {
	priorityMap.set(key, Math.max(...value))
})

let result = 0
sequenceParsed.forEach(line => {
	let priority = []
	for (let num of line) {
		priority.push(priorityMap.get(num) || 0)
	}
	if (isNonIncreasing(priority)) {
		console.log(line)
		console.log(priority)
		const el = line[Math.round((line.length - 1) / 2)]
		console.log(el)
		result += el
	}
})

console.log(result)


