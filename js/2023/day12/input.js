import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(path.resolve(__dirname, "../input.txt"), "utf-8");
const input1 = fs.readFileSync(path.resolve(__dirname, "../input1.txt"), "utf-8");
const input2 = fs.readFileSync(path.resolve(__dirname, "../input2.txt"), "utf-8");

export {input, input1, input2};
