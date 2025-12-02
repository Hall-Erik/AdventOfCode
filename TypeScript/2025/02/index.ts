import { readFile } from '../common/file';
import { KeyChecker } from './keys';

async function main() {
  const line = await readFile(`${__dirname}/input.txt`);
  let kc = new KeyChecker(line);
  console.log(`Part 1: ${kc.invalidSum}`);
  kc = new KeyChecker(line, 2);
  console.log(`Part 2: ${kc.invalidSum}`);
}

main();
