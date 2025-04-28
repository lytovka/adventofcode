import HttpHelper from "./http.js";

const http = new HttpHelper();

export async function submit() {
  const [year, day, part, answer] = process.argv.slice(2);
  const { AOC_BASE_URL, AOC_SESSION } = process.env;

  if (!year || !day || !part || !answer) {
    console.error("Usage: node submit.js <year> <day> <part> <answer>");
    process.exit(1);
  }

  if (!AOC_SESSION || !AOC_BASE_URL) {
    console.error(
      "Make sure all environment variables are set in the .env file",
    );
    process.exit(2);
  }

  const result = await http.post(
    `${process.env.AOC_BASE_URL}/${year}/day/${day}/answer`,
    `level=${part}&answer=${answer}`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      cookie: `session=${process.env.AOC_SESSION}`,
    },
  );
  if (!result.ok) {
    console.error(result.error);
    process.exit(3);
  }

  console.log(result.payload);
}

await submit();
