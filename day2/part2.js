const { readFile, arraySum } = require("../utils");

function isInvalid(id) {
  const idStr = String(id);

  return idStr.match(/^(.+)\1+$/);
}

function processRange(range) {
  const [startStr, endStr] = range.split("-");

  const start = Number(startStr);
  const end = Number(endStr);

  const invalidIds = [];
  let currentId = start;

  while (currentId <= end) {
    const isIdInvalid = isInvalid(currentId);

    if (isIdInvalid) {
      invalidIds.push(currentId);
    }

    currentId++;
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
