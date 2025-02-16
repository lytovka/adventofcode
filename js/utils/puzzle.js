export async function puzzle() {
	const [year, day] = process.argv.slice(2);
	if (!year || !day) {
		console.error('Usage: node puzzle.js <year> <day>');
		return;
	}

	const response = await fetch(`https://adventofcode.com/${year}/day/${day}`, { method: "GET" });

	if (response.status !== 200) {
		console.error('Failed to fetch puzzle');
		return;
	}

	const text = await response.text();
	const match = text.match(/<article\s\S*>([\s\S]+)<\/article>/);
	if (!match) {
		console.error('Failed to parse puzzle');
		return;
	}
	const puzzle = match[1].replace(/<[^>]*>/g, '');

	console.log(puzzle);
}

await puzzle();


