# Advent of Code - JavaScript Solutions

JavaScript solutions for [Advent of Code](https://adventofcode.com/) puzzles.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env
```

Add your session token to `.env`:

```
AOC_BASE_URL="https://adventofcode.com"
AOC_SESSION="your_session_token_here"
```

3. Build the project:

```bash
npm run build
```

## CLI Commands

### Fetch Input

```bash
npm run aoc input <year> <day>
```

Downloads puzzle input to `puzzles/<year>/day<day>/input.txt`

### View Puzzle

```bash
npm run aoc puzzle <year> <day>
```

Displays puzzle description in terminal

### Solve Puzzle

```bash
npm run aoc solve <year> <day> <part>
```

Runs your solution file (`<year>/day<day>/part_<part>.js`)

### Submit Answer

```bash
npm run aoc submit <year> <day> <part> <answer>
```

Submits your answer to Advent of Code

### Open in Browser

```bash
npm run aoc open <year> <day>
```

Opens puzzle page in browser

## Project Structure

```
js/
├── 2024/
│   └── day1/
│       ├── part_1.js
│       └── part_2.js
├── utils/
│   ├── aoc.js       # AoC API client
│   ├── commands.js  # CLI commands
│   ├── http.js      # HTTP helper
│   └── misc.js      # Utilities
└── cli.js           # CLI entry point
```

## Solution Template

```javascript
import { readInputFromFile } from "~/utils/misc.js";

const input = readInputFromFile(2024, 1);

// Your solution here
console.log(input);
```
