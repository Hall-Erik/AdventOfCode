import { readLines } from '../common/file.js';
import { Maze } from './maze.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const maze = new Maze(lines);
  console.log('Part 1', maze.getScore());
}

main();
