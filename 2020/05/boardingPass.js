class BoardingPass {
    constructor (passStr) {
        this._row = parseInt(
            passStr.slice(0, 7)
                   .replace(/F/g, '0')
                   .replace(/B/g, '1'),
            2
        );

        this._col = parseInt(
            passStr.slice(7, 10)
                   .replace(/L/g, '0')
                   .replace(/R/g, '1'),
            2
        );
    }

    get row() {
        return this._row;
    }

    get col() {
        return this._col;
    }

    get seatID() {
        return this._row * 8 + this._col;
    }
}

module.exports = BoardingPass;
