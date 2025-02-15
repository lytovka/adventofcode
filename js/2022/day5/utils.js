const patternLength = "[X]".length;
const pattern = new RegExp(`.{1,${patternLength + 1}}`, "g"); // +1 for the space

const generateArrayOfStacks = (indices) =>
  Array.from(
    {
      length: indices.trim().split(/\s+/).length,
    },
    () => []
  );

const parseAndSaveScheme = (rawScheme, res) => {
  rawScheme.forEach((line) => {
    const parsedLine = line.match(pattern).map((s) => s.trim());
    parsedLine.forEach((value, i) => {
      value && res[i].push(value);
    });
  });
  return res;
};

const parseMoves = (rawMoves) =>
  rawMoves.split("\n").map((sentence) => {
    const numbers = sentence.match(/\d+/g).map(Number);
    return {
      quantity: numbers[0],
      from: numbers[1] - 1, // convert to 0-based index
      to: numbers[2] - 1, // convert to 0-based index
    };
  });

export { pattern, patternLength, generateArrayOfStacks, parseAndSaveScheme, parseMoves };
