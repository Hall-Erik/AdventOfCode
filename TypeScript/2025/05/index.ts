import { readLines } from '../common/file';
import { Ingredients } from './ingredients';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const i = new Ingredients(lines);
  console.log(`Part 1: ${i.freshCount}`);
  console.log(`Part 2: ${i.freshIngredientIdCount}`);
}

main();
