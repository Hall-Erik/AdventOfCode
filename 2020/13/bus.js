class Bus {
    constructor (interval) {
        this._interval = interval;
    }

    get id() {
        return this._interval;
    }

    getWaitTime(timestamp) {
        const rem = timestamp % this._interval;
        if (rem === 0) {
            return 0;
        } else {
            return this._interval - rem;
        }
    }
}

module.exports = Bus;