const fs = require('fs');

const Maze = require('./maze');


let lines = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1).map((line) => {
    return Number(line);
});

let maze = new Maze(lines);

while (!maze.isExitFound) {
    maze.step();
}

console.log(`Took ${maze.steps} steps to exit`);

lines = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1).map((line) => {
    return Number(line);
});

maze = new Maze(lines, true);

while (!maze.isExitFound) {
    maze.step();
}

console.log(`Took ${maze.steps} "strange" steps to exit`);