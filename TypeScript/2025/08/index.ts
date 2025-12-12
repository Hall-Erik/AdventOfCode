import { readLines } from '../common/file';
import { Circuits } from './junction';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const c = new Circuits(lines);
  console.log(`Part 1: ${c.mult(1000)}`);
  console.log(`Part 2: ${c.mult2()}`);
}

main();
