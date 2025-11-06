import { readLines } from '../common/file.js';
import { MemorySpace } from './memorySpace.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  let m = new MemorySpace(lines);
  m.dropBytes(1024);
  console.log('Part 1', m.getStepsToExit());
  m = new MemorySpace(lines);
  console.log('Part 2', m.findLastByte());
}

main();
