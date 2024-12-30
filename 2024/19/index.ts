import { readLines } from '../common/file.js';
import { Towels } from './towels.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const t = new Towels(lines);
  console.log('Part 1', t.countPossible(true));
  console.log('Part 2', t.countPossibleCombos(true));
}

main();
