const fs = require('fs');

const Bag = require('./bag');

const adapters = fs.readFileSync('input.txt', 'utf-8')
                   .split('\n')
                   .slice(0, -1)
                   .map((adapter) => Number(adapter));

const bag = new Bag(adapters);

const chain = bag.chain;

console.log(`Chain is ${chain}`);

const arrangements = bag.arrangements;

console.log(`${arrangements} total arrangements`);