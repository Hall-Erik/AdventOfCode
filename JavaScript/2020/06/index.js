const fs = require('fs');

const Batch = require('./batch');

let batch = new Batch(fs.readFileSync('input.txt', 'utf-8'));

console.log(`${batch.countGroupAnswers()} "yesses" were counted.`);

batch = new Batch(fs.readFileSync('input.txt', 'utf-8'), true);

console.log(`${batch.countGroupAnswers()} "yesses" were unanimous.`);
