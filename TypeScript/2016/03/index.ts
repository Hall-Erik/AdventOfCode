import { readLines } from '../common/file';
import { Triangles } from './triangle';

async function main() {
  const list = (await readLines(`${__dirname}/input.txt`)).map((row) =>
    row
      .split(' ')
      .map((c) => parseInt(c))
      .filter((c) => !isNaN(c)),
  );
  const ts = new Triangles(list);
  console.log(`Part 1: ${ts.countValidTrianglesHorizontal()}`);
  console.log(`Part 1: ${ts.countValidTrianglesVertical()}`);
}

main();
