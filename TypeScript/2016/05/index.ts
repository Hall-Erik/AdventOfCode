import MD5 from 'crypto-js/md5';
import ProgressBar from 'progress';

function buildAndRenderBar(message: string) {
  const bar = new ProgressBar(`${message} [:bar] :percent :etas`, {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: 8,
  });
  bar.render();
  return bar;
}

function hack(input: string) {
  const bar = buildAndRenderBar(`decoding ${input}...`);

  let times = 0;
  let i = 0;
  let code = '';

  while (times < 8) {
    const hash = MD5(input + i).toString();
    if (hash.startsWith('00000')) {
      code += `${hash[5]}`;
      times++;
      bar.tick();
    }
    i++;
  }

  return code;
}

function hack2(input: string) {
  const bar = buildAndRenderBar(`decoding ${input} with position...`);

  let times = 0;
  let i = 0;
  let code = ['', '', '', '', '', '', '', ''];

  while (times < 8) {
    const hash = MD5(input + i).toString();
    if (hash.startsWith('00000')) {
      const pos = parseInt(hash[5]);
      if (pos >= 0 && pos <= 7 && !code[pos]) {
        code[pos] = `${hash[6]}`;
        times++;
        bar.tick();
      }
    }
    i++;
  }

  return code.join('');
}

console.log(`Test input part 1: ${hack('abc')}`);

console.log(`Part 1: ${hack('reyedfim')}`);

console.log(`Test input part 2: ${hack2('abc')}`);

console.log(`Part 1: ${hack2('reyedfim')}`);
