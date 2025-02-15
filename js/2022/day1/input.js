import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, "../../../puzzles/2022/day1/input.txt"), "utf-8");

export default input;
