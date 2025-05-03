## Setup
1. Sign in to [Advent of Code](https://adventofcode.com/)
2. Retrieve the cookie value for the `session` cookie for the `https://adventofcode.com` domain
3. Populate the `.env` file and install dependencies
```bash
cat .env.example > .env
echo "AOC_SESSION=<your-session-cookie-value>" >> .env
nvm use
npm i
```

## Commands
### Print puzzle content to stdout
```bash
npm run puzzle <year> <day>
```
### Save puzzle input
```bash
npm run input <year> <day>
```
### Setup file for the puzzle
```bash
npm run setup <year> <day> <part>
```
### Solve the puzzle
```bash
npm run solve <year> <day> <part>
```
### Submit the puzzle to AOC
```bash
npm run submit <year> <day> <part> <answer>
```