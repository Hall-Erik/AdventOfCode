import { readLines } from '../common/file';
import { Warehouse } from './warehouse';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const warehouse = new Warehouse(lines);
  console.log(`Part 1: ${warehouse.getAccessibleRolls()}`);
  console.log(`Part 2: ${warehouse.findAndRemoveAccessibleRolls()}`);
}

main();
