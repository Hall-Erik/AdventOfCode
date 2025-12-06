import { readLines } from '../common/file';
import { CMath, CMathPart2 } from './cMath';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const c = new CMath(lines);
  console.log(`Part 1: ${c.grandTotal}`);
  const c2 = new CMathPart2(lines);
  console.log(`Part 2: ${c2.grandTotal}`);
}

main();
