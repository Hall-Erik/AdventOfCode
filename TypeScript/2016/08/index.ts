import { Screen } from './screen';
import { readLines } from '../common/file';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const s = new Screen(50, 6);
  lines.forEach((l) => s.processInstruction(l));
  console.log(`Part 1: ${s.voltage}`);
  console.log('Part 2:');
  console.log(`${s}`);
}

main();
