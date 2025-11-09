import { readLines } from '../common/file';
import { Code } from './code';

async function main() {
  const input = await readLines(`${__dirname}/input.txt`);
  const c = new Code(input);
  console.log(`Part 1: ${c.decoded}`);
  console.log(`Part 2: ${c.modifiedDecoded}`);
}

main();
