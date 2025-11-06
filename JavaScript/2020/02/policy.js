class Policy {
    constructor (policyString) {
        // policyString ex: "1-3 a: abcde"
        const policy = policyString.split(' ');
        const count = policy[0].split('-');

        this._min = Number(count[0]);
        this._max = Number(count[1]);
        this._char = policy[1].replace(':', '');
        this._password = policy[2];
    }

    isValid() {
        const n = (this._password.match(new RegExp(this._char, 'g')) || []).length;
        return (n >= this._min && n <= this._max);
    }

    isValidNewRules() {
        const first = this._password[this._min-1];
        const second = this._password[this._max-1];
        return (
            (first === this._char || second === this._char) &&
            !(first === second)
        );
    }

    get min() {
        return this._min;
    }

    get max() {
        return this._max;
    }

    get char() {
        return this._char;
    }

    get password() {
        return this._password;
    }
}

module.exports = Policy;