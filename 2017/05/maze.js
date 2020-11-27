class Maze {
    constructor(offsets, strangeJumps=false) {
        this.offsets = offsets;
        this._pos = 0;
        this._steps = 0;
        this._strangeJumps = strangeJumps;
    }

    step() {
        if (!this._strangeJumps || this.offsets[this._pos] < 3) {
            this._pos = this._pos + this.offsets[this._pos]++;
        } else {
            this._pos = this._pos + this.offsets[this._pos]--;
        }
        this._steps++;
    }

    get isExitFound() {
        return (this._pos >= this.offsets.length || this._pos < 0);
    }

    get pos() {
        return this._pos;
    }

    get steps() {
        return this._steps;
    }

    get print() {
        return this.offsets.toString();
    }
}

module.exports = Maze;