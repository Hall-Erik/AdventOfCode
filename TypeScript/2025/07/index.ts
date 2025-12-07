import { readLines } from '../common/file';
import { Manifold, QuantumManifold } from './manifold';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const m = new Manifold([...lines]);
  console.log(`Part 1: ${m.splitCount}`);
  const qm = new QuantumManifold([...lines]);
  console.log(`Part 2: ${qm.timelineCount}`);
}

main();
