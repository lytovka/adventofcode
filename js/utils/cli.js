import fs from "node:fs";
import path from "node:path";
import { EXIT_CODES, getCliArgs } from "./misc.js";
import aocService from "./aoc.js";

class CliCommands {
  async getInput() {
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
      return `Input saved to file: ${filePath}`;
    } catch (error) {
      console.error("Failed to save input to file.", error);
      process.exit(EXIT_CODES.IO_ERROR);
    }
  }

  async setupJsFile() {
    const content = (year, day) => {
      return `
import { readInputFromFile } from "~/utils/readInputFromFile.js";

const input = readInputFromFile(${year}, ${day});

console.log(input);
  `.trim();
    };

    const [year, day, part] = getCliArgs("year", "day", "part");
    const dir = `${process.env.ROOT_DIR}/js/${year}/day${day}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.resolve(dir, `part_${part}.js`);
    if (fs.existsSync(filePath)) {
      console.error(`File ${filePath} already exists`);
      process.exit(EXIT_CODES.IO_ERROR);
    }
    fs.writeFileSync(filePath, content(year, day));
    return `File created: ${filePath}`;
  }

  async getPuzzle() {
    const args = getCliArgs("year", "day");
    const result = await aocService.fetchPuzzle(...args);
    if (!result.ok) {
      console.error(result.error);
      process.exit(EXIT_CODES.API_ERROR);
    }
    const match = result.payload.match(/<article\s\S*>([\s\S]+)<\/article>/);
    if (!match) {
      console.error("Failed to parse puzzle");
      process.exit(EXIT_CODES.OTHER);
    }
    return match[1].replace(/<[^>]*>/g, "");
  }

  async submitPuzzle() {
    const args = getCliArgs("year", "day", "part", "answer");
    const result = await aocService.submitAnswer(...args);
    if (!result.ok) {
      console.error(result.error);
      process.exit(EXIT_CODES.API_ERROR);
    }
    return result.payload;
  }
}

export default new CliCommands();
