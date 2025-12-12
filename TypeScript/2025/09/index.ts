import { readLines } from '../common/file';
import { Roof } from './roof';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const roof = new Roof(lines);
  console.log(`Part 1: ${roof.largestArea}`);
  console.log(`Part 2: ${roof.largestArea2}`);
}

main();
