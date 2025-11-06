import { readLines } from '../common/file.js';
import { Claw } from './claw.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  let claw = new Claw(lines);
  console.log('Part 1', claw.getMinTokens());
  claw = new Claw(lines, true);
  console.log('Part 2', claw.getMinTokens());
}

main();
