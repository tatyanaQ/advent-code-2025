const { readFile, arraySum } = require("../utils");

const paperRoll = "@";

function getAboveCells(grid, row, column) {
  if (row === 0) {
    return [];
  }

  return [
    ...(grid[row - 1][column - 1] || []),
    ...[grid[row - 1][column]],
    ...(grid[row - 1][column + 1] || []),
  ];
}

function getNextCells(grid, row, column) {
  return [...(grid[row][column - 1] || []), ...(grid[row][column + 1] || [])];
}

function getBelowCells(grid, row, column) {
  if (row === grid.length - 1) {
    return [];
  }

  return [
    ...(grid[row + 1][column - 1] || []),
    ...[grid[row + 1][column]],
    ...(grid[row + 1][column + 1] || []),
  ];
}

function getAdjacentCells(grid, row, column) {
  return [
    ...getAboveCells(grid, row, column),
    ...getNextCells(grid, row, column),
    ...getBelowCells(grid, row, column),
  ];
}

function checkLine(cells, row, grid) {
  const accessibleCells = cells.filter((cell, column) => {
    if (cell !== paperRoll) {
      return false;
    }

    const content = getAdjacentCells(grid, row, column);
    const paperRolls = content.filter((c) => c === paperRoll);
    return paperRolls.length < 4;
  });

  return accessibleCells.length;
}

function solvePuzzle(inputFileName) {
  const grid = readFile({ fileName: inputFileName, trimmed: true }).map(
    (line) => line.split("")
  );

  const accessibleRolls = grid.map(checkLine);

  const sum = arraySum(accessibleRolls);

  console.log(sum);
}

module.exports = {
  solvePuzzle,
};
