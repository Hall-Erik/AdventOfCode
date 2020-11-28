const fs = require('fs');

const Board = require('./board');

const input = fs.readFileSync('input.txt').toString();

console.log('Part 1');
const board = new Board(input);
while (!board.done) {
    board.makeMove();
}
console.log(`Done in ${board.moves} distribution cycles.`);

console.log('\nPart 2');
board.reset();
while (!board.done) {
    board.makeMove();
}
console.log(`Loop is ${board.moves} cycles.`);