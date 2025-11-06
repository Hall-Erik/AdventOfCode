const Group = require('./group');

class Batch {
    constructor (batchStr, consensus=false) {
        this._groups = batchStr.split('\n\n').map((group) => {
            return new Group(group, consensus);
        });
    }

    get answers() {
        return this._groups.map((group) => {
            return group.answers;
        });
    }

    countGroupAnswers() {
        return this._groups.map((group) => {
            return group.countAnswers();
        }).reduce((a, b) => {
            return a + b;
        }, 0);
    }
}

module.exports = Batch;