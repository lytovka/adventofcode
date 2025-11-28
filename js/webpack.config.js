import path from "node:path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import webpack from "webpack";
import { glob } from "glob"

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const solutions = glob.sync(__dirname + `/20**/**/*.js`)
  .reduce((acc, file) => {
    const p = file.replace(/\.js$/, "").replace(__dirname, "")
    acc[p] = file;
    return acc;
  }, {});

/**
 * @type {import ("webpack").Configuration}
 */
export default (env) => {
  const { year, day, part } = env;
  const additionalEntries = {}
  if (year && day && part) {
    const entry = `./${year}/day${day}/part_${part}`;
    additionalEntries[entry] = `${entry}.js`;
  }

  /**
   * @type {import ("webpack").Configuration}
   */
  return {
    cache: true,
    entry: {
      cli: path.resolve(__dirname, "./cli.js"),
      ...additionalEntries,
      ...solutions
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      libraryTarget: "module",
    },
    target: "node",
    mode: "development",
    experiments: {
      outputModule: true,
    },
    resolve: {
      extensions: [".js"],
    },
    stats: "minimal",
    resolve: {
      alias: {
        "~/*": path.resolve(__dirname, "./*"),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env), // Injects all environment variables
        "process.env.ROOT_DIR": JSON.stringify(path.dirname(__dirname, "..")), // 👈 Injects root dir
      }),
    ],
  };
};
