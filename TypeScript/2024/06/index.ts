import { readLines } from '../common/file.js';
import { Map, Maps } from './map.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const m = new Map(lines);
  m.moveUntilOOB();
  console.log('Part 1:', m.getTotalVisited());
  const mps = new Maps(lines);
  console.log('Part 2:', mps.getTotalPossibleLoops());
}

main();
