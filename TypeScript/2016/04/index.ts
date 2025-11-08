import { readLines } from '../common/file';
import { Rooms } from './rooms';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const rooms = new Rooms(lines);
  const sum = rooms.sumRealSectors();
  console.log(`Part 1: ${sum}`);
  console.log(`Part 2: ${rooms}`);
}

main();
