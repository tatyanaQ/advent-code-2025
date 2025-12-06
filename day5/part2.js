const { readFile, arraySum } = require("../utils");

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });

  const devider = lines.findIndex((line) => line === "");

  const ranges = lines
    .slice(0, devider)
    .map((range) => range.split("-").map(Number));

  const dots = Array.from(
    new Set(
      ranges.filter(([start, end]) => start === end).map(([start]) => start)
    )
  );

  const clearRanges = ranges.filter(([start, end]) => start != end);

  const isIncludedInAnotherRange = (point) => {
    return clearRanges.some((range) => range[0] < point && range[1] > point);
  };

  const starts = clearRanges
    .map(([start]) => start)
    .filter((start) => !isIncludedInAnotherRange(start))
    .sort((a, b) => a - b);

  const ends = clearRanges
    .map(([, end]) => end)
    .filter((end) => !isIncludedInAnotherRange(end))
    .sort((a, b) => a - b);

  const points = Array.from(new Set([...starts, ...ends])).sort(
    (a, b) => a - b
  );

  const distinctRanges = [];
  let start = points[0];

  points.slice(1).forEach((point) => {
    if (start) {
      if (!starts.includes(point)) {
        distinctRanges.push([start, point]);
        start = null;
      }
    } else {
      start = point;
    }
  });

  const separateDots = dots.filter(
    (dot) => !distinctRanges.find((range) => range[0] <= dot && range[1] >= dot)
  );

  const rangesCounts = distinctRanges.map(([start, end]) => end - start + 1);

  const count = arraySum(rangesCounts) + separateDots.length;

  console.log(count);
}

module.exports = {
  solvePuzzle,
};
