class Bag {
    constructor (adapters) {
        this._adapters = [0, ...adapters].sort((a, b) => a - b); // what a dumb sorting behavior
        this._adapters.push(this._adapters[this._adapters.length-1] + 3);
        this.checkAdapters();
        this._seenEndings = {};
    }

    checkAdapters() {
        this._ones = 0;
        this._threes = 0;
        for (let i=0; i<this._adapters.length-1; i++) {
            let diff = this._adapters[i+1] - this._adapters[i];
            switch (diff) {
                case 3:
                    this._threes++;
                    break;
                case 1:
                    this._ones++;
                    break;
            }
        }
    }

    get arrangements() {
        const arr = {'0': 1};
        for (let adapter of this._adapters) {
            if (adapter === 0) continue;
            const m1Str = String(adapter-1);
            const m2Str = String(adapter-2);
            const m3Str = String(adapter-3);
            const m1 = (m1Str in arr) ? arr[m1Str] : 0;
            const m2 = (m2Str in arr) ? arr[m2Str] : 0;
            const m3 = (m3Str in arr) ? arr[m3Str] : 0;
            arr[adapter] = m1 + m2 + m3;
        }
        let last = arr[String(this._adapters[this._adapters.length-1])];
        return last;
    }

    get chain() {
        return this._ones * this._threes;
    }
}

module.exports = Bag;