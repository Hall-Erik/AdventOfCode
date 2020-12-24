const fs = require('fs');
const Bus = require('./bus');

function findEarliestBus(timestamp, busses) {
    return busses.reduce((prev, curr) => {
        return (prev.getWaitTime(timestamp) < curr.getWaitTime(timestamp)) ? prev : curr;
    });    
}

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');
const arrival = Number(input[0]);

const busses = input[1].split(',')
                       .filter((num) => {
                           return num !== 'x';
                       })
                       .map((num) => {
                           return new Bus(Number(num));
                       });

const earliest = findEarliestBus(arrival, busses);

console.log(`Part 1: ${earliest.id * earliest.getWaitTime(arrival)}`);

module.exports = {
    findEarliestBus: findEarliestBus,
};