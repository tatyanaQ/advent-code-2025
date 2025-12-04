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
  const accessibleCells = cells
    .map((cell, column) => {
      if (cell !== paperRoll) {
        return null;
      }

      const content = getAdjacentCells(grid, row, column);
      const paperRolls = content.filter((c) => c === paperRoll);
      return paperRolls.length < 4 ? { row, column } : null;
    })
    .filter(Boolean);

  return accessibleCells;
}

function solvePuzzle(inputFileName) {
  const grid = readFile({ fileName: inputFileName, trimmed: true }).map(
    (line) => line.split("")
  );

  let count = 0;

  while (true) {
    const accessibleCells = grid.flatMap(checkLine);
    const accessibleCellsCount = accessibleCells.length;

    if (accessibleCellsCount === 0) {
      break;
    }

    count += accessibleCellsCount;

    accessibleCells.forEach(({ row, column }) => {
      grid[row][column] = ".";
    });
  }

  console.log(count);
}

module.exports = {
  solvePuzzle,
};
