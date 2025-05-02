import { assertRequiredEnvs, getCliArgs } from "./misc.js";
import aocService from "./AoCService.js";

export async function puzzle() {
  assertRequiredEnvs();
  const [year, day] = getCliArgs("year", "day");
  const result = await aocService.fetchPuzzle(year, day);
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
