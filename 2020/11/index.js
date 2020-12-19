const fs = require('fs');

const Lobby = require('./lobby');

const lobbyStr = fs.readFileSync('input.txt', 'utf-8');

const lobby = new Lobby(lobbyStr);
lobby.run();

console.log(`Lobby stabilizes at ${lobby.occupiedSeats} occupied seats.`);

const newLobby = new Lobby(lobbyStr, true);
newLobby.run();

console.log(`Lobby stabilizes at ${newLobby.occupiedSeats} occupied seats with the new rules.`);