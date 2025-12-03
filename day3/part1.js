const { readFile, arraySum } = require("../utils");

function findMax(array, ignoreLast) {
  const maxJoltage = Math.max(...array);
  const maxJoltageIndex = array.findIndex((b) => b === maxJoltage);

  if (maxJoltageIndex === array.length - 1 && ignoreLast) {
    return findMax(array.slice(0, -1));
  }

  return { joltage: maxJoltage, index: maxJoltageIndex };
}

function findLargestJoltage(bank) {
  const batteries = bank.split("").map(Number);

  const { joltage: first, index: firstIndex } = findMax(batteries, true);
  const { joltage: second } = findMax(batteries.slice(firstIndex + 1));

  return first * 10 + second;
}

function solvePuzzle(inputFileName) {
  const banks = readFile({ fileName: inputFileName, trimmed: true });

  const maxJoltegies = banks.map(findLargestJoltage);

  const sum = arraySum(maxJoltegies);

  console.log(sum);
}

module.exports = {
  solvePuzzle,
};
