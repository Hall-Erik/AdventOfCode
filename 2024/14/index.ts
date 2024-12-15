import { readLines } from '../common/file.js';
import { RobotMap } from './robotMap.js';

interface Frame {
  safetyFactor: number;
  map: string;
  iteration: number;
}

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  let rm = new RobotMap(lines);
  rm.wait();
  console.log('Part 1', rm.getSafetyFactor());
  rm = new RobotMap(lines);
  const frames: Frame[] = [];
  for (let i = 1; i < 10001; i++) {
    rm.wait(1);
    const sf = rm.getSafetyFactor();
    const map = rm.toString();
    frames.push({
      safetyFactor: sf,
      map: map,
      iteration: i,
    });
  }
  frames.sort((a, b) => a.safetyFactor - b.safetyFactor);
  console.log(frames[0].map);
  console.log('Part 2', frames[0].iteration);
}

main();
