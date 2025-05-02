import { assertRequiredEnvs, EXIT_CODES, getCliArgs } from "./misc.js";
import aocService from "./AoCService.js";

export async function submit() {
  assertRequiredEnvs();
  const args = getCliArgs("year", "day", "part", "answer");
  const result = await aocService.submitAnswer(...args);
  if (!result.ok) {
    console.error(result.error);
    process.exit(EXIT_CODES.API_ERROR);
  }
  console.log(result.payload);
}

await submit();
