const { readFile, arraySum } = require("../utils");

const lastIndex = 11;

function findLargestJoltage(bank) {
  const batteries = bank.split("").map(Number);

  let fromIndex = 0;
  const numbers = [];

  for (let i = 0; i <= lastIndex; i++) {
    const toIndex = batteries.length + -lastIndex + i - 1;

    const array = batteries.slice(fromIndex, toIndex + 1);
    const joltage = Math.max(...array);

    const index = batteries.findIndex(
      (b, index) => b === joltage && index >= fromIndex && index <= toIndex
    );

    numbers.push(joltage);
    fromIndex = index + 1;
  }

  const joltage = numbers.reduce(
    (acc, num, index) => acc + num * Math.pow(10, lastIndex - index),
    0
  );

  return joltage;
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
