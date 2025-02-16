import fs from "node:fs";

export async function input() {
  const [year, day] = process.argv.slice(2);
  if (!year || !day) {
    console.error("Usage: node input.js <year> <day>");
    return;
  }

  const result = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      method: "GET",
      headers: { cookie: `session=${process.env.AOC_SESSION}` },
    },
  );

  if (result.status !== 200) {
    console.error("Failed to fetch input.", result.status, result.statusText);
    return;
  }

  try {
    const input = await result.text();
    const dir = `${process.env.ROOT_DIR}/puzzles/${year}/day${day}`;
    const filePath = `${dir}/input.txt`;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, input, { flag: "w" });
    console.log("Input saved to file:", filePath);
  } catch (error) {
    console.error("Failed to save input to file.", error);
  }
}

await input();
