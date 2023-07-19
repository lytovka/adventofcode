const a_code = "a".charCodeAt();
const A_code = "A".charCodeAt();

const medianPos = (strLen) => Math.floor(strLen / 2);

const findCommonCharacters = (str1, str2) => {
  const commonCharacters = new Set();
  const str1Chars = str1.split("");
  for (let c of str1Chars) {
    if (str2.includes(c)) {
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

export { medianPos, findCommonCharacters, charVal };
