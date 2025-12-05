import { readLines } from '../common/file';
import { BatterySupply } from './battery';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const bs = new BatterySupply(lines);
  console.log(`Part 1: ${bs.getTotalJoltage()}`);
  console.log(`Part 2: ${bs.getTotal12Joltage()}`);
}

main();
