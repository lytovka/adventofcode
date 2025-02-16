import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const utilsEntries = fs.readdirSync(path.resolve(__dirname, './utils'), 'utf-8').filter((file) => file.endsWith('.js')).reduce((acc, file) => {
	acc[`utils/${file.replace(/\.js$/, '')}`] = `./utils/${file}`;
	return acc;
}, {})

console.log('utilsEntries', utilsEntries);

export default (env) => {
	const { year, day, part } = env;
	const entries = { ...utilsEntries };
	if (year && day && part) {
		const entry = `./${year}/day${day}/part_${part}`;
		entries[entry] = `${entry}.js`
	}

	return {
		entry: entries,
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
			libraryTarget: 'module',
		},
		target: 'node',
		mode: "development",
		experiments: {
			outputModule: true,
		},
		resolve: {
			extensions: ['.js'],
		},
		stats: {
			errorDetails: true
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': JSON.stringify(process.env), // Injects all environment variables
				'process.env.ROOT_DIR': JSON.stringify(path.dirname(__dirname, "..")) // 👈 Injects root dir

			})
		]
	}
}
