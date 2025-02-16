import fs from "fs";
import path from "path";

export const stringToReplace = (year, day) => {
  return `
import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(${year}, ${day});
	`.trim();
};

const __dirname = fs.realpathSync("./2023");

const allJsFiles = fs
  .readdirSync(__dirname, { recursive: true })
  .filter((file) => file.endsWith(".js"));

const regex =
  /import\s+\{?input, input1, input2\s*\}?\s+from\s+['"]\.\/input\.js['"]/;

const inputFiles = allJsFiles.filter((file) =>
  fs.readFileSync(path.resolve(__dirname, file), "utf-8").match(regex),
);

inputFiles.forEach((file) => {
  const p = path.resolve(__dirname, file);
  const content = fs.readFileSync(p, "utf-8");
  console.log(content, "\n-----");
  const match = file.match(/day(\d+)/);
  const newContent = content.replace(regex, stringToReplace(2023, match[1]));
  fs.writeFileSync(p, newContent, { flag: "w" });
});

console.log(allJsFiles);
console.log(inputFiles);
