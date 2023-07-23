export const findIndex = (input, count) => {
  const buff = [];
  for (let i = 0; i < input.length; i++) {
    buff.push(input[i]);
    if (buff.length === count) {
      const set = new Set(buff);
      if (set.size === count) {
        return i + 1;
      }
      buff.shift();
    }
  }
};
