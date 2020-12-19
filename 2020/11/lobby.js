const Seat = require("./seat");

class Lobby {
    constructor (lobbyStr, newRules=false) {
        this._lobbyMap = {};
        const rows = lobbyStr.split('\n').slice(0, -1);
        this._numRows = rows.length;
        this._numCols = rows[0].length;
        for (let y=0; y<this._numRows; y++) {
            for (let x=0; x<this._numCols; x++) {
                const val = rows[y][x];
                if (val === 'L' || val === '#') {
                    const seat = new Seat(x, y, (val === '#') ? true : false, newRules);
                    this._lobbyMap[seat.pos] = seat;
                }
            }
        }
        const seats = Object.values(this._lobbyMap);
        if (!newRules) {
            this.oldNeighborRules(seats);
        } else {
            this.newNeighborRules(seats);
        }
    }

    newNeighborRules(seats) {
        for (let seat of seats) {
            const neighbors = [];
            //to the right
            for (let x=seat.x+1; x<this._numCols; x++) {
                let n = this._lobbyMap[`${x},${seat.y}`];
                if (n) {
                    neighbors.push(n);
                    break;
                }
            }
            //to the left
            for (let x=seat.x-1; x>=0; x--) {
                let n = this._lobbyMap[`${x},${seat.y}`];
                if (n) {
                    neighbors.push(n);
                    break;
                }
            }
            //up
            for (let y=seat.y-1; y>=0; y--) {
                let n = this._lobbyMap[`${seat.x},${y}`];
                if (n) {
                    neighbors.push(n);
                    break;
                }
            }
            //down
            for (let y=seat.y+1; y<this._numRows; y++) {
                let n = this._lobbyMap[`${seat.x},${y}`];
                if (n) {
                    neighbors.push(n);
                    break;
                }
            }
            //r-d
            for (let i=1;(seat.x+i<this._numCols&&seat.y+i<this._numRows);i++) {
                let n = this._lobbyMap[`${seat.x+i},${seat.y+i}`];
                if (n) {
                    neighbors.push(n);
                    break;
                }
            }
            //r-u
            for (let i=1;(seat.x+i<this._numCols&&seat.y-i>=0);i++) {
                let n = this._lobbyMap[`${seat.x+i},${seat.y-i}`];
                if (n) {
                    neighbors.push(n);
                    break;
                }
            }
            //l-d
            for (let i=1;(seat.x-i>=0&&seat.y+i<this._numRows);i++) {
                let n = this._lobbyMap[`${seat.x-i},${seat.y+i}`];
                if (n) {
                    neighbors.push(n);
                    break;
                }
            }
            //l-u
            for (let i=1;(seat.x-i>=0&&seat.y-i>=0);i++) {
                let n = this._lobbyMap[`${seat.x-i},${seat.y-i}`];
                if (n) {
                    neighbors.push(n);
                    break;
                }
            }
            seat.neighbors = neighbors;
        }
    }

    oldNeighborRules(seats) {
        for (let seat of seats) {
            const neighbors = seats.filter((neighbor) => {
                return (
                    (
                        neighbor.x >= seat.x - 1 &&
                        neighbor.x <= seat.x + 1 &&
                        neighbor.y >= seat.y - 1 &&
                        neighbor.y <= seat.y + 1
                    )
                    &&
                    !(
                        neighbor.x === seat.x &&
                        neighbor.y === seat.y
                    )
                );
            });
            seat.neighbors = neighbors;
        }
    }

    preStep() {
        const seats = Object.values(this._lobbyMap);
        for (let seat of seats) {
            seat.prepareMove();
        }
    }

    countChanged() {
        return Object.values(this._lobbyMap)
                     .filter(seat => seat.changed)
                     .length;
    }

    step() {
        const seats = Object.values(this._lobbyMap);
        for (let seat of seats) {
            seat.makeMove();
        }
    }

    run() {
        while (true) {
            this.preStep();
            if (this.countChanged() === 0) break;
            this.step();
        }
    }

    printMap() {
        for (let y=0; y<this._numRows; y++) {
            let line = '';
            for (let x=0; x<this._numCols; x++) {
                let s = this._lobbyMap[`${x},${y}`];
                if (!s) {
                    line += '.';
                } else if (s.occupied) {
                    line += '#';
                } else {
                    line += 'L';
                }
            }
            console.log(line);
        }
    }

    get lobbyMap() {
        return this._lobbyMap;
    }

    get seats() {
        return Object.values(this._lobbyMap);
    }

    get occupiedSeats() {
        return Object.values(this._lobbyMap)
                     .filter(seat => seat.occupied)
                     .length;
    }

}

module.exports = Lobby;
