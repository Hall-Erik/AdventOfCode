import { readLines } from '../common/file.js';
import { Plots } from './plots.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const plots = new Plots(lines);
  console.log('Part 1', plots.totalPrice);
  console.log('Part 2', plots.totalBulkPrice);
}

main();
