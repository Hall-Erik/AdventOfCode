class Ship {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._heading = 0;
    }

    turn(direction) {
        let amount = Number(direction.slice(1));
        if (direction[0] === 'L') {
            this._heading -= amount;
        } else {
            this._heading += amount;
        }
        if (this._heading < 0) {
            this._heading = 360 + this._heading;
        }
        this._heading = this._heading % 360;
    }

    east(amount) {
        this._x += Number(amount);
    }

    west(amount) {
        this._x -= Number(amount);
    }

    north(amount) {
        this._y += Number(amount);
    }

    south(amount) {
        this._y -= Number(amount);
    }

    forward(amount) {
        this.move(this.cardinal + amount);
    }

    move(direction) {
        const amount = direction.slice(1);
        const instruction = direction[0];
        switch (instruction) {
            case 'L':
            case 'R':
                this.turn(direction);
                break;
            case 'E':
                this.east(amount);
                break;
            case 'W':
                this.west(amount);
                break;
            case 'N':
                this.north(amount);
                break;
            case 'S':
                this.south(amount);
                break;
            case 'F':
                this.forward(amount);
                break;
        }
    }

    get cardinal() {
        switch (this._heading) {
            case 0:
                return 'E';
            case 90:
                return 'S';
            case 180:
                return 'W';
            default:
                return 'N';
        }
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get heading() {
        return this._heading;
    }

    get mDistance() {
        return Math.abs(this._x) + Math.abs(this._y);
    }
}

module.exports = Ship;