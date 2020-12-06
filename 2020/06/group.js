class Group {
    constructor (groupStr, consensus=false) {
        this._answers = {};
        this._groupAnswers = groupStr.split('\n').filter((group) => {
            return (group !== '');
        });
        for (let member of this._groupAnswers) {
            for (let answer of member) {
                this._answers[answer] = true;
            }
        }

        if (consensus) {
            for (let answer of Object.keys(this._answers)) {
                for (let member of this._groupAnswers) {
                    if (!member.includes(answer)) {
                        delete this._answers[answer];
                    }
                }
            }
        }
    }

    get answers() {
        return this._answers;
    }

    get groupAnswers() {
        return this._groupAnswers;
    }

    countAnswers() {
        return Object.keys(this._answers).length;
    }
}

module.exports = Group;