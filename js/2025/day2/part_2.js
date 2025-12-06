import { readInputFromFile } from "../../utils/misc.js";

const input = readInputFromFile(2025, 2);
const input2 = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`
const ranges = input.split(',')

const expandedRanges = ranges.map(r => {
  const res = []
  const [low, high] = r.split("-")
  let l = parseInt(low)
  let h = parseInt(high)
  for (let i = l; i <= h; i++) {
    res.push(i.toString())
  }
  return res
})

const values = []
for (let i = 0; i < expandedRanges.length; i++) {
  const range = expandedRanges[i]
  for (let j = 0; j < range.length; j++) {
    const num = range[j]
    const m = new Map()
    for (let z = 0; z < num.length / 2; z++) {
      const left = num.slice(0, z + 1)
      const right = num.slice(z + 1)
      if (left.length <= right.length) m.set(left, 0)
    }
    for (const [key, val] of m.entries()) {
      const keyLength = key.length
      const subVal = num.slice(keyLength)
      const subValLength = subVal.length
      if (subValLength % keyLength !== 0) continue

      for (let z = 0; z < subValLength; z = z + keyLength) {
        const subDigit = subVal.slice(z, keyLength + z)
        if (key === subDigit) {
          m.set(key, m.get(key) + 1)
        }
      }
      if (m.get(key) === subValLength / keyLength) {
        values.push(parseInt(num))
        break;
      }
    }
  }
}

console.log(values.reduce((acc, v) => acc + v, 0));
