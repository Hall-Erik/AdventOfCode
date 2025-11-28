import { readLines } from '../common/file';
import { Bots } from './bots';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const bots = new Bots(lines);
  console.log(`Part 1: ${bots.getBotNameByVals(17, 61)}`);
  console.log(`Part 2: ${bots.getOutputsMultiplied()}`);
}

main();
