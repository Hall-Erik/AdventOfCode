import { readLines } from '../common/file.js';
import { Topo } from './topo.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const t = new Topo(lines);
  console.log('Part 1', t.scoreTrailheads());
  console.log('Part 2', t.rateTrailheads());
}

main();
