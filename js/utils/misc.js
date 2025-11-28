import fs from "node:fs";

export const EXIT_CODES = {
  SUCCESS: 0,
  MISSING_ENV: 1,
  INVALID_ARGS: 2,
  API_ERROR: 3,
  IO_ERROR: 4,
  OTHER: 5,
};

export function assertRequiredEnvs() {
  const requiredEnvVars = ["AOC_SESSION", "AOC_BASE_URL"];
  const missingEnvVars = requiredEnvVars.filter((env) => !process.env[env]);
  if (missingEnvVars.length > 0) {
    console.error(
      `Missing environment variables: ${missingEnvVars.join(", ")}`,
    );
    process.exit(EXIT_CODES.MISSING_ENV);
  }
  return {
    sessionToken: process.env.AOC_SESSION,
    baseUrl: process.env.AOC_BASE_URL,
  };
}

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
