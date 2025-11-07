import { readFile } from '../common/file';
import { City } from './city';

async function main() {
  const line = await readFile(`${__dirname}/input.txt`);
  const instructions = line.split(', ').filter((c) => c.length > 0);
  let city = new City();
  city.followInstructions(instructions);
  console.log('Part 1: ', city.dist);
  city = new City();
  city.followInstructions(instructions, true);
  console.log('Part 2: ', city.dist);
}

main();
