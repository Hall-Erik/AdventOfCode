class Map {
    constructor (mapStr) {
        this._map = [];
        this._width = mapStr[0].length;
        this._height = mapStr.length;
        for (let y=0; y<mapStr.length; y++) {
            for (let x=0; x<mapStr[y].length; x++) {
                if (mapStr[y][x] === '#') {
                    this._map.push(`${x},${y}`);
                }
            }
        }
    }

    hasTreeAt(x, y) {
        return this._map.includes(`${x%this._width},${y}`);
    }

    countTrees(dX, dY) {
        let x = 0;
        let y = 0;
        let count = this.hasTreeAt(x, y) ? 1 : 0;
        while (y <= this._height) {
            x += dX;
            y += dY;
            if (this.hasTreeAt(x, y)) {
                count++;
            }
        }
        return count;
    }

    get map() {
        return this._map;
    }
}

module.exports = Map;