import fs from "node:fs";
import { EXIT_CODES, getCliArgs } from "./misc.js";
import aocService from "./AoCService.js";

export async function input() {
  const [year, day] = getCliArgs("year", "day");
  const result = await aocService.fetchInput(year, day);
  if (!result.ok) {
    console.error(result.error);
    process.exit(EXIT_CODES.API_ERROR);
  }
  try {
    const dir = `${process.env.ROOT_DIR}/puzzles/${year}/day${day}`;
    const filePath = `${dir}/input.txt`;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, result.payload, { flag: "w" });
    console.log("Input saved to file:", filePath);
  } catch (error) {
    console.error("Failed to save input to file.", error);
    process.exit(EXIT_CODES.IO_ERROR);
  }
}

await input();
