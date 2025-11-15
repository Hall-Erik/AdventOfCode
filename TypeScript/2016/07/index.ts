import { IpV7 } from './ipv7';
import { readLines } from '../common/file';

async function main() {
  const lines = await readLines(`${__dirname}/input.txt`);
  const addresses = lines.map((l) => new IpV7(l));
  const tlsAddresses = addresses.filter((a) => a.isTls);
  const sslAddresses = addresses.filter((a) => a.isSsl);
  console.log(`Part 1: ${tlsAddresses.length}`);
  console.log(`Part 2: ${sslAddresses.length}`); // 158 too low
}

main();
