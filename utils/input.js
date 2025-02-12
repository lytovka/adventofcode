import dotenv from 'dotenv';
import fs from "node:fs";

dotenv.config();

async function main() {
	const [year, day] = process.argv.slice(2);
	if (!year || !day) {
		console.error('Usage: node input.js <year> <day>');
		return;
	}

	const result = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, { method: "GET", headers: { "cookie": `session=${process.env.AOC_SESSION}` } })

	if (result.status !== 200) {
		console.error('Failed to fetch input');
		return;
	}

	const input = await result.text();
	fs.mkdirSync(`./${year}/day${day}`, { recursive: true });
	fs.writeFileSync(`./${year}/day${day}/input.txt`, input, { flag: "a+" });
	console.log('Input saved to file');
}

await main();
