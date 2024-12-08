import { readLines } from '../common/file.js';
import { Map } from './map.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const m = new Map(lines);
  m.findePodes();
  console.log('Part 1', m.totalPodes());
  const m2 = new Map(lines);
  m2.findePodes(true);
  console.log('Part 2', m2.totalPodes());
}

main();
