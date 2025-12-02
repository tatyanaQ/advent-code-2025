const { readFile } = require("../utils");

const startPosition = 50;
const size = 100;

function rotateRight(start, distance) {
  const rawPosition = start + distance;
  return {
    zeroPoints: Math.floor(rawPosition / size),
    nextPosition: rawPosition % size,
  };
}

function rotateLeft(start, distance) {
  const rawPosition = start - distance;
  const step = rawPosition % size;

  if (step <= 0) {
    const passingZero = start === 0 ? 0 : 1;

    return {
      zeroPoints: Math.floor(Math.abs(rawPosition / size)) + passingZero,
      nextPosition: step === 0 ? step : size + step,
    };
  }

  return {
    zeroPoints: 0,
    nextPosition: step,
  };
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
    const { zeroPoints, nextPosition } = rotate(currentPosition, lines[i]);

    zeroPositionCount += zeroPoints;
    currentPosition = nextPosition;
  }

  console.log("count: ", zeroPositionCount);
}

module.exports = {
  solvePuzzle,
};
