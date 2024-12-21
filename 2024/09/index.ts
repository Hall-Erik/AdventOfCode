import { readLines } from '../common/file.js';
import { Disk } from './disk.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  let d = new Disk(lines[0]);
  d.fragment();
  console.log('Part 1', d.getChecksum());
  d = new Disk(lines[0]);
  d.compact();
  console.log('Part 2', d.getChecksum());
}

main();
