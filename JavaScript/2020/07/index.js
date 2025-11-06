const fs = require('fs');

const Rules = require('./rules');

const ruleFile = fs.readFileSync('input.txt', 'utf-8');

const rules = new Rules(ruleFile);
const goldCount = rules.count('shiny gold bags');

console.log(`${goldCount} other bags can contain shiny gold bags.`);

const goldContains = rules.countNested('shiny gold bags');
console.log(`Shiny gold bag contains ${goldContains} bags.`);