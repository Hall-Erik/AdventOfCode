const fs = require('fs');

const Map = require('./map');

const lines = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1);

const map = new Map(lines);

const trees = map.countTrees(3, 1);

console.log(`Encountered ${trees} trees`);

const slopesProduct = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
].map((slope) => {
    return map.countTrees(slope[0], slope[1]);
}).reduce((a, b) => {
    return a * b;
}, 1);

console.log(` Encountered ${slopesProduct} trees`);