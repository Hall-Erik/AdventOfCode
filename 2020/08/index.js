const fs = require('fs');

const Loader = require('./loader');

const program = fs.readFileSync('input.txt', 'utf-8');

const loader = new Loader(program);
loader.runProgram();
console.log(`acc = ${loader.acc}`);
