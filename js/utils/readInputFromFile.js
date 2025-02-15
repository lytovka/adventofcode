import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";


export function readInputFromFile(year, day) {
	if (!year || !day) {
		throw new Error("Year and day must be provided");
	}

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const input = fs.readFileSync(path.resolve(__dirname, `../../puzzles/${year}/day${day}/input.txt`), "utf-8");
	return input;
}
