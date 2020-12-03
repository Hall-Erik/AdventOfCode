const fs = require('fs');

const Policy = require('./policy');

const lines = fs.readFileSync('input.txt').toString().split('\n').filter((line) => {
    return line.length > 1;
});

let validPasswords = 0;
let newRulesValidPassword = 0;

for (let line of lines) {
    let policy = new Policy(line);
    if (policy.isValid()) {
        validPasswords++;
    }
    if (policy.isValidNewRules()) {
        newRulesValidPassword++;
    }
}

console.log(`${validPasswords} passwords are valid.`);

console.log(`${newRulesValidPassword} passwords are valid according to the new rules.`);