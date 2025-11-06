import { readLines } from '../common/file.js';
import { Wordsearch, Wordsearch2 } from './wordsearch';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const w = new Wordsearch(lines);
  console.log('Part 1:', w.getCount());
  const w2 = new Wordsearch2(lines);
  console.log('Part 2:', w2.getCount());
}

main();
