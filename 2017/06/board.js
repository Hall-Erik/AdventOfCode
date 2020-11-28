class Board {
    constructor (banks) {
        this._banks = banks.replace('\n', '').split('\t').map((bank) => {
            return Number(bank);
        });        
        this.reset();
    }

    findLargest() {
        let pos = 0;
        let max = 0;
        for (let i=0; i<this._banks.length; i++) {
            if (this._banks[i] > max) {
                max = this._banks[i];
                pos = i;
            }
        }
        return pos;
    }

    makeMove() {
        let pos = this.findLargest();
        let blocks = this._banks[pos];
        this._banks[pos] = 0;
        pos++;
        while (blocks > 0) {
            this._banks[pos%this._banks.length]++;
            pos++;
            blocks--;
        }
        this._moves++;
        if (this._seenConfigs.has(this._banks.join(','))) {
            this._done = true;
        } else {
            this._seenConfigs.add(this._banks.join(','));
        }
    }

    reset() {
        this._seenConfigs = new Set();
        this._seenConfigs.add(this._banks.join(','));
        this._moves = 0;
        this._done = false;
    }

    get done() {
        return this._done;
    }

    get moves() {
        return this._moves;
    }

    get banks() {
        return this._banks;
    }
}

module.exports = Board;