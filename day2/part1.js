const { readFile, arraySum } = require("../utils");

function findNextInvalId(idStr) {
  const length = idStr.length;
  const id = Number(idStr);

  if (length % 2 === 1) {
    return findNextInvalId(String(Math.pow(10, length)));
  }

  const pattern = idStr.slice(0, length / 2);
  const possibleNext = `${pattern}${pattern}`;

  if (Number(possibleNext) > id) {
    return possibleNext;
  }

  const nextPattern = Number(pattern) + 1;
  return `${nextPattern}${nextPattern}`;
}

function processRange(range) {
  const [startStr, endStr] = range.split("-");

  const start = Number(startStr);
  const end = Number(endStr);

  const invalidIds = [];
  let currentIdStr = String(start - 1);

  while (true) {
    const nextInvalidStr = findNextInvalId(currentIdStr);
    const nextInvalId = Number(nextInvalidStr);

    if (nextInvalId >= start && nextInvalId <= end) {
      invalidIds.push(nextInvalId);

      currentIdStr = nextInvalidStr;
    } else {
      break;
    }
  }

  return invalidIds;
}

function solvePuzzle(inputFileName) {
  const [line] = readFile({ fileName: inputFileName, trimmed: true });

  const ranges = line.split(",");

  const invalidIds = ranges.flatMap(processRange);

  const sum = arraySum(invalidIds);

  console.log(sum);
}

module.exports = {
  solvePuzzle,
};
