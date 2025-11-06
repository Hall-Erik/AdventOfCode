const { isValidPassphrase } = require('./part1');
const { hasNoAnagrams } = require('./part2');
const fs = require('fs');

function toPassPhrase(line) {
    return line.split(' ');
}

console.log('Part 1');
console.log('Tests');
let phrase = toPassPhrase('aa bb cc dd ee');
console.log((isValidPassphrase(phrase) === true) ? 'pass': 'fail');
phrase = toPassPhrase('aa bb cc dd aa');
console.log((isValidPassphrase(phrase) === false) ? 'pass': 'fail');
phrase = toPassPhrase('aa bb cc dd aaa');
console.log((isValidPassphrase(phrase) === true) ? 'pass': 'fail');

console.log();
console.log('Solution');

let validPhrases = 0;
const file = fs.readFileSync('input.txt', 'utf-8').split('\n');

for (let line of file) {
    if (isValidPassphrase(toPassPhrase(line))) {
        validPhrases++;
    }
}
console.log(`Valid phrases: ${validPhrases}`);

console.log();
console.log('Part 2');
console.log('Tests');
phrase = toPassPhrase('abcde fghij');
console.log((hasNoAnagrams(phrase) === true) ? 'pass': 'fail');
phrase = toPassPhrase('abcde xyz ecdab');
console.log((hasNoAnagrams(phrase) === false) ? 'pass': 'fail');
phrase = toPassPhrase('a ab abc abd abf abj');
console.log((hasNoAnagrams(phrase) === true) ? 'pass': 'fail');
phrase = toPassPhrase('iiii oiii ooii oooi oooo');
console.log((hasNoAnagrams(phrase) === true) ? 'pass': 'fail');
phrase = toPassPhrase('oiii ioii iioi iiio');
console.log((hasNoAnagrams(phrase) === false) ? 'pass': 'fail');


console.log();
console.log('Solution');

validPhrases = 0;
for (let line of file) {
    if (hasNoAnagrams(toPassPhrase(line))) {
        validPhrases++;
    }
}
console.log(`Valid phrases: ${validPhrases}`);
