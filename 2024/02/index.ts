import { Report } from './reports.js';
import { readLines } from '../common/file.js';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);

  let reports = lines.map((l) => new Report(l));
  console.log('Part 1:', reports.filter((r) => r.isSafe()).length);

  reports = lines.map((l) => new Report(l, true));
  console.log('Part 2:', reports.filter((r) => r.isSafe()).length);
}

main();
