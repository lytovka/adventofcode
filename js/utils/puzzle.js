import HttpHelper from "./http.js";

const http = new HttpHelper();

export async function puzzle() {
  const [year, day] = process.argv.slice(2);
  if (!year || !day) {
    console.error("Usage: node puzzle.js <year> <day>");
    process.exit(1);
  }

  if (!process.env.AOC_SESSION) {
    console.error("AOC_SESSION is not defined in .env file");
    process.exit(2);
  }

  const result = await http.get(
    `${process.env.AOC_BASE_URL}/${year}/day/${day}`,
    {
      cookie: `session=${process.env.AOC_SESSION}`,
    },
  );
  if (!result.ok) {
    console.error(result.error);
    process.exit(3);
  }

  const match = result.payload.match(/<article\s\S*>([\s\S]+)<\/article>/);
  if (!match) {
    console.error("Failed to parse puzzle");
    return;
  }
  console.log(match.length);
  const puzzle = match[1].replace(/<[^>]*>/g, "");

  console.log(puzzle);
  process.exit(0);
}

await puzzle();
