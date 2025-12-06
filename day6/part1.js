const { readFile, arraySum, arrayMultiplication } = require("../utils");

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true }).map(
    (line) => line.split(/\s+/)
  );

  const problemsCount = lines[0].length;

  const problems = Array.from({ length: problemsCount }).map((_, index) => {
    return lines.map((line) => line[index]);
  });

  const solvings = problems.map((problem) => {
    const operator = problem.pop();
    const operands = problem.map(Number);

    switch (operator) {
      case "+":
        return arraySum(operands);
      case "*":
        return arrayMultiplication(operands);
    }
  });

  const sum = arraySum(solvings);

  console.log(sum);
}

module.exports = {
  solvePuzzle,
};
