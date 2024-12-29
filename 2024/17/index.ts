import { readLines } from '../common/file.js';
import { Computer } from './computer';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const computer = new Computer(lines);
  console.log('Part 1', computer.run());
  console.log('Part 2', computer.findQuine());
}

main();
