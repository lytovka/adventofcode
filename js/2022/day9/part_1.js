import { readInputFromFile } from "../../utils/readInputFromFile.js";

const input = readInputFromFile(2022, 9);
import {Grid2D} from "./utils.js";

const grid = new Grid2D().build(input.trim());

const uniqueTailPoints = new Set();
grid.history.forEach((record) => {
  uniqueTailPoints.add(`${record.t[0]}:${record.t[1]}`);
});

console.log(uniqueTailPoints.size);
