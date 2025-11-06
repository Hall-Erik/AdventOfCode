import { readLines } from '../common/file.js';
import { Stones } from './stones.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  let s = new Stones(lines[0]);
  console.log('Part 1', s.getStoneCount(25));

  s = new Stones(lines[0]);
  console.log('Part 2', s.getStoneCount(75));
}

main();
