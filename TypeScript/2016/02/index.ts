import { readLines } from '../common/file';
import { Keypad } from './keypad';

async function main() {
  let kp = new Keypad(1);
  const instructions = await readLines(`${__dirname}/input.txt`);
  kp.enterCode(instructions);
  console.log(`Part 1: ${kp.code}`);
  kp = new Keypad(2);
  kp.enterCode(instructions);
  console.log(`Part 2: ${kp.code}`);
}

main();
