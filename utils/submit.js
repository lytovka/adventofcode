import dotenv from 'dotenv';
import fs from "node:fs";

dotenv.config();

async function main() {
	console.log(process.argv)
	const [result] = process.argv.slice(2);
	if (!result) {
		console.error('Usage: node submit.js <result>');
		return;
	}

	console.log(result)
}

await main()
