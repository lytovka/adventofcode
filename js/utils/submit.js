export async function submit() {
  // https://adventofcode.com/2024/day/1/answer
  console.log(process.argv);
  const [result] = process.argv.slice(2);
  if (!result) {
    console.error("Usage: node submit.js <result>");
    return;
  }

  console.log(result);
}

await submit();
