import { readLines } from '../common/file';
import { ServerRack } from './serverRack';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const s = new ServerRack(lines);
  console.log(`Part 1: ${s.paths}`);
  console.log(`Part 2: ${s.paths2}`);
}

main();
