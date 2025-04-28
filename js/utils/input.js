import fs from "node:fs";
import HttpHelper from "./http.js";

const http = new HttpHelper();

export async function input() {
  const [year, day] = process.argv.slice(2);
  if (!year || !day) {
    console.error("Usage: node input.js <year> <day>");
    process.exit(1);
  }

  const result = await http.get(
    `${process.env.AOC_BASE_URL}/${year}/day/${day}/input`,
    {
      cookie: `session=${process.env.AOC_SESSION}`,
    },
  );
  if (!result.ok) {
    console.error(result.error);
    process.exit(2);
  }

  try {
    const dir = `${process.env.ROOT_DIR}/puzzles/${year}/day${day}`;
    const filePath = `${dir}/input.txt`;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, result.payload, { flag: "w" });
    console.log("Input saved to file:", filePath);
  } catch (error) {
    console.error("Failed to save input to file.", error);
  }
}

await input();
