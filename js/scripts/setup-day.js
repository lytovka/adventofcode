import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const content = (year, day) => {
  return `
import { readInputFromFile } from "~/utils/readInputFromFile.js";

const input = readInputFromFile(${year}, ${day});

console.log(input);
  `.trim();
};

async function setup() {
  const [year, day, part] = process.argv.slice(2);

  if (!year || !day || !part) {
    console.error("Usage: node setup-day.js <year> <day> <part>");
    return;
  }
  const dir = path.resolve(__dirname, `../${year}/day${day}`);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const filePath = path.resolve(dir, `part_${part}.js`);
  if (fs.existsSync(filePath)) {
    console.error(`File ${filePath} already exists`);
    return;
  }

  fs.writeFileSync(filePath, content(year, day));
}

await setup();
