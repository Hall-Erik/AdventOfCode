const fs = require('fs');

function findEntriesThatSumTo2020(entries) {
    for (let i=0; i<entries.length-1; i++) {
        for (let j=i+1; j<entries.length; j++) {
            if (entries[i] + entries[j] === 2020) {
                return [entries[i], entries[j]];
            }
        }
    }
}

function findThreeEntries(entries) {
    for (let i=0; i<entries.length-2; i++) {
        for (let j=i+1; j<entries.length-1; j++) {
            for (let k=j+1; k<entries.length; k++) {
                if (entries[i] + entries[j] + entries[k] === 2020) {
                    return [entries[i], entries[j], entries[k]];
                }
            }
        }
    }
}

function getProduct(entries) {
    return entries.reduce((a, b) => {
        return a * b;
    }, 1);
}

const entries = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1).map((entry) => {
    return Number(entry);
});

console.log(`Part 1 answer is ${getProduct(findEntriesThatSumTo2020(entries))}`);
console.log();
console.log(`Part 2 answer is ${getProduct(findThreeEntries(entries))}`);

module.exports = {
    findEntriesThatSumTo2020: findEntriesThatSumTo2020,
    findThreeEntries: findThreeEntries,
    getProduct: getProduct,
};