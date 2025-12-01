const { readFile } = require("../utils");

const startPosition = 50;
const size = 100;

function rotateRight(start, distance) {
  const rawPosition = start + distance;
  return rawPosition % size;
}

function rotateLeft(start, distance) {
  const rawPosition = start - distance;
  const step = rawPosition % size;
  return step < 0 ? size + step : step;
}

function rotate(start, rotation) {
  const direction = rotation[0];
  const distance = Number(rotation.slice(1));

  switch (direction) {
    case "R":
      return rotateRight(start, distance);
    case "L":
      return rotateLeft(start, distance);
  }
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });

  let zeroPositionCount = 0;
  let currentPosition = startPosition;

  for (let i = 0; i < lines.length; i++) {
    currentPosition = rotate(currentPosition, lines[i]);

    if (currentPosition === 0) {
      zeroPositionCount++;
    }
  }

  console.log("count: ", zeroPositionCount);
}

module.exports = {
  solvePuzzle,
};
