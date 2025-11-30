async function main() {
  // npm run start day3 part1

  const [day, part] = process.argv.slice(2);

  const fileName = process.env.INPUT;

  const puzzleModule = `./${day}/${part}`;

  const { solvePuzzle } = require(puzzleModule);

  await solvePuzzle(fileName);
}

main()
  .then(() => console.log("Done"))
  .catch((err) => console.error("Error", err));
