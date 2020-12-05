const fs = require('fs');

const Batch = require('./batch');

batchFile = fs.readFileSync('input.txt', 'utf-8');
batch = new Batch(batchFile);

console.log(`${batch.countValid()} passports are valid.`);

batchWithExtraValidation = new Batch(batchFile, true);
console.log(`${batchWithExtraValidation.countValid()} passports are really valid.`);
