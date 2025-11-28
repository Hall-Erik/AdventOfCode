import { Format } from './format';
import { readFile } from '../common/file';

async function main() {
  const file = await readFile(`${__dirname}/input.txt`);
  const f = new Format(file);
  const decodedLength = f.decodeLength();
  console.log(`Part 1: ${decodedLength}`);
  const fullDecodeLength = f.fullDecodeLength();
  console.log(`Part 2: ${fullDecodeLength}`);
}

main();
