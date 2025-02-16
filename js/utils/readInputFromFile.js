import fs from "fs";

export function readInputFromFile(year, day) {
  if (!year || !day) {
    throw new Error("Year and day must be provided");
  }

  const input = fs.readFileSync(
    `${process.env.ROOT_DIR}/puzzles/${year}/day${day}/input.txt`,
    "utf-8",
  );
  return input.trim();
}
