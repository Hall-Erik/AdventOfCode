class Seat {
    constructor (x, y, occupied, newRules=false) {
        this._x = x;
        this._y = y;
        this._occupied = occupied;
        this._next = occupied;
        this._newRules = newRules;
    }

    set neighbors(neighbors) {
        this._neighbors = neighbors;
    }

    get neighbors() {
        return this._neighbors;
    }

    prepareMove() {
        const occupiedNeighbors = this._neighbors.filter((n) => {
            return n.occupied;
        }).length;
        if (!this._occupied && occupiedNeighbors === 0) {
            this._next = true;
        } else if (
                this._occupied &&
                (
                    (!this._newRules && occupiedNeighbors >= 4)
                    ||
                    (this._newRules && occupiedNeighbors >= 5)
                )
            ) {
            this._next = false;
        }
    }

    get changed() {
        return this._next !== this._occupied;
    }

    makeMove() {
        this._occupied = this._next;
    }

    get occupied() {
        return this._occupied;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get pos() {
        return `${this._x},${this._y}`;
    }
}

module.exports = Seat;
