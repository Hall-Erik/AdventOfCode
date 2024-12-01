import fs from 'node:fs/promises';

export async function readLines(filename: string) {
  let file = '';
  try {
    file = await fs.readFile(filename, { encoding: 'utf-8' });
  } catch (e) {
    console.log(`Error reading from input file ${e}`);
    throw e;
  }
  const lines = file.split('\n');
  lines.pop();
  return lines;
}
