const { readFile } = require("../utils");

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });

  const devider = lines.findIndex((line) => line === "");

  const ranges = lines
    .slice(0, devider)
    .map((range) => range.split("-").map(Number));

  const ids = lines.slice(devider + 1).map(Number);

  const fresh = ids.filter((id) => {
    for (let i = 0; i < ranges.length; i++) {
      if (id >= ranges[i][0] && id <= ranges[i][1]) {
        return true;
      }
    }

    return false;
  });

  const count = fresh.length;

  console.log(count);
}

module.exports = {
  solvePuzzle,
};
