const { readFile, arraySum, arrayMultiplication } = require("../utils");

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName });

  const columnsCount = lines[0].length;
  const transponated = [];

  for (let i = columnsCount - 1; i >= 0; i--) {
    const column = [];

    for (let j = 0; j < lines.length; j++) {
      column.push(lines[j][i]);
    }

    transponated.push(column.join("").trim());
  }

  const problems = transponated.reduce(
    (acc, item) => {
      if (item === "") {
        acc.push([]);
      } else {
        const containsOperator = /[+*]/.test(item);
        const operand = containsOperator
          ? Number(item.substring(0, item.length - 1))
          : Number(item);
        acc[acc.length - 1].push(operand);
        if (containsOperator) {
          acc[acc.length - 1].push(item.substring(item.length - 1));
        }
      }

      return acc;
    },
    [[]]
  );

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
