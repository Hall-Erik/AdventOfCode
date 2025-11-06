const Passport = require('./passport');

class Batch {
    constructor (batchFile, validate=false) {
        this._batches = batchFile.split('\n\n').map((pp) => {
            return new Passport(pp.replace(new RegExp('\n', 'g'), ' ').trim(), validate);
        });
    }

    countValid() {
        let valid = 0;

        this._batches.forEach((pp) => {
            if (pp.isValid()) {
                valid++;
            }
        });

        return valid;
    }

    get passports() {
        return this._batches;
    }
}

module.exports = Batch;