import { Lists } from './list.js';
import { readLines } from '../common/file.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const lists = new Lists(lines);
  console.log('Part 1:', lists.getTotalDistance());
  console.log('Part 2:', lists.getSimilarityScore());
}

main();
