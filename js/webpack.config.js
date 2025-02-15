import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	entry: {
		input: path.resolve(__dirname, 'utils/input.js'),
		puzzle: path.resolve(__dirname, 'utils/puzzle.js'),
	},
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
	plugins: [
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(process.env), // Injects all environment variables
			'process.env.ROOT_DIR': JSON.stringify(path.dirname(__dirname, "..")) // 👈 Injects root dir

		})
	]
}
