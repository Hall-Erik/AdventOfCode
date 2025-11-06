import { readLines } from '../common/file.js';
import { Printer } from './printer.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const p = new Printer(lines);
  console.log('Part 1:', p.getMPNTotal());
  console.log('Part 2:', p.getInvalidMPNTotal());
}

main();
