export const EXIT_CODES = {
  SUCCESS: 0,
  MISSING_ENV: 1,
  INVALID_ARGS: 2,
  API_ERROR: 3,
  IO_ERROR: 4,
  OTHER: 5,
};

export function getCliArgs(...argNames) {
  if (!Array.isArray(argNames)) {
    process.exit("args must be an array");
  }
  const [...args] = process.argv.slice(2);
  if (args.length !== argNames.length) {
    console.error(
      "Expected CLI arguments: " +
        argNames.map((name) => `<${name}>`).join(", "),
    );
    process.exit(EXIT_CODES.INVALID_ARGS);
  }
  return args;
}

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
