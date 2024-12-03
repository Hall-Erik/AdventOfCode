import { readLines } from '../common/file.js';
import { Computer } from './computer.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  let result = lines
    .map((l) => Computer.process(l))
    .reduce((acc, cur) => acc + cur, 0);
  console.log('Part 1:', result);
  const c = new Computer();
  result = lines
    .map((l) => c.processConditionally(l))
    .reduce((acc, cur) => acc + cur, 0);
  console.log('Part 2:', result); // 102631226 too high
}

main();
