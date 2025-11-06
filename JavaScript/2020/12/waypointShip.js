const Ship = require('./ship');

class WaypointShip extends Ship {
    constructor () {
        super();
        this._wx = 10;
        this._wy = 1;
    }

    east(amount) {
        this._wx += Number(amount);
    }

    west(amount) {
        this._wx -= Number(amount);
    }

    north(amount) {
        this._wy += Number(amount);
    }

    south(amount) {
        this._wy -= Number(amount);
    }

    turn(direction) {
        super.turn(direction);

        let temp;
        switch (this._heading) {
            case 0:
                break;
            case 90:
                temp = this._wx;
                this._wx = this._wy;
                this._wy = -1 * temp;
                break;
            case 180:
                this._wx = -1 * this._wx;
                this._wy = -1 * this._wy;
                break;
            case 270:
                temp = this._wx;
                this._wx = -1 * this._wy;
                this._wy = temp;
                break;
        }

        this._heading = 0;
    }

    forward(amount) {
        this._x = this._x + (this._wx * Number(amount));
        this._y = this._y + (this._wy * Number(amount));
    }

    get waypointX() {
        return this._wx;
    }

    get waypointY() {
        return this._wy;
    }
}

module.exports = WaypointShip;
