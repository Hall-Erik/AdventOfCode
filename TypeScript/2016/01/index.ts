import { readFile } from '../common/file';
import { City } from './city';

async function main() {
  const instructions = await readFile(`${__dirname}/input.txt`);
  const city = new City();
  city.followInstructions(instructions.split(', ').filter(c => c.length > 0));
  console.log(city);
}

main();
