const a_code = "a".charCodeAt();
const A_code = "A".charCodeAt();

const medianPos = (strLen) => Math.floor(strLen / 2);

const findCommonCharacters = (...strings) => {
  const commonCharacters = new Set();
  const [str1, ...restStrings] = strings;
  const str1Chars = str1.split("");
  for (let c of str1Chars) {
    if (restStrings.map((str) => str.includes(c)).every((b) => b)) {
      commonCharacters.add(c);
    }
  }
  return [...commonCharacters];
};

const charVal = (char) => {
  return /[a-z]/.test(char)
    ? char.charCodeAt() - a_code + 1
    : char.charCodeAt() - A_code + 27;
};

const groupBy = (arr, itemsInGroup) => {
  const groups = [];
  for (let i = 0; i < arr.length; i += itemsInGroup) {
    groups.push(arr.slice(i, i + itemsInGroup));
  }
  return groups;
};

export { medianPos, findCommonCharacters, charVal, groupBy };
