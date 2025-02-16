export async function submit() {
  const [year, day, part, answer] = process.argv.slice(2);

  if (!year || !day || !part || !answer) {
    console.error("Usage: node submit.js <year> <day> <part> <answer>");
    return;
  }

  const response = await fetch(
    `${process.env.AOC_BASE_URL}/${year}/day/${day}/answer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        cookie: `session=${process.env.AOC_SESSION}`,
      },
      body: `level=${part}&answer=${answer}`,
    },
  );

  if (response.status !== 200) {
    console.error(
      "Failed to submit answer",
      response.status,
      response.statusText,
    );
    return;
  }
  const text = await response.text();
  console.log(text);
}

await submit();
