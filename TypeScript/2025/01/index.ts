import { readLines } from '../common/file';
import { Safe } from './safe';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  let safe = new Safe();
  safe.rotate(lines);
  console.log(`Part 1: ${safe.zeroes}`);
  safe = new Safe(50, true);
  safe.rotate(lines);
  console.log(`Part 2: ${safe.zeroes}`);
}

main();
