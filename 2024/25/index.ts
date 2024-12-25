import { readLines } from '../common/file.js';
import { Locks } from './lock.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const locks = new Locks(lines);
  console.log('Part 1', locks.getFitCount());
}

main();
