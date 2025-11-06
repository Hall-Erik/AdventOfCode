const fs = require('fs');

const Ship = require('./ship');
const WaypointShip = require('./waypointShip');

const directions = fs.readFileSync('input.txt', 'utf-8').split('\n').slice('0, -1');

const ship = new Ship();
const waypointShip = new WaypointShip();

for (let direction of directions) {
    ship.move(direction);
    waypointShip.move(direction);
}

console.log(`Moved ${ship.mDistance} units from starting point`);

console.log(`Moved ${waypointShip.mDistance} units with waypoint rules`);
