const fs = require('fs');

const Cipher = require('./cipher');

const nums = fs.readFileSync('input.txt', 'utf-8')
               .split('\n')
               .slice(0, -1)
               .map(num => Number(num));

const cipher = new Cipher(nums, 25);

const invalidNumber = cipher.findFailingNumber();

console.log(`First failing number is ${invalidNumber}`);

const encryptionWeakness = cipher.findEncryptionWeakness();

console.log(`Encryption weakness is ${encryptionWeakness}`);