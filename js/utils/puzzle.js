export async function puzzle() {
  const [year, day] = process.argv.slice(2);
  if (!year || !day) {
    console.error("Usage: node puzzle.js <year> <day>");
    return;
  }

  const response = await fetch(
    `${process.env.AOC_BASE_URL}/${year}/day/${day}`,
    {
      method: "GET",
      headers: { cookie: `session=${process.env.AOC_SESSION}` },
    },
  );

  if (response.status !== 200) {
    console.error("Failed to fetch puzzle");
    return;
  }

  const text = await response.text();
  const match = text.match(/<article\s\S*>([\s\S]+)<\/article>/);
  if (!match) {
    console.error("Failed to parse puzzle");
    return;
  }
  console.log(match.length);
  const puzzle = match[1].replace(/<[^>]*>/g, "");

  console.log(puzzle);
}

await puzzle();
