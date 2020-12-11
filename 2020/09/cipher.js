class Cipher {
    constructor (numbers, preambleSize) {
        this._preambleSize = preambleSize;
        this._numbers = numbers;
    }

    isValidNumber(number, slice) {
        let valid = false;

        const slicedSlice = slice.filter(num => num <= number);
        for (let i=0; i<slicedSlice.length-1; i++) {
            for (let j=i+1; j<slicedSlice.length; j++) {
                if (slicedSlice[i] + slicedSlice[j] === number) {
                    return true
                }
            }
        }

        return valid;
    }

    findFailingNumber() {
        for (let i=this._preambleSize; i<this._numbers.length; i++) {
            const num = this._numbers[i];
            const checkSlice = this._numbers.slice(i-this._preambleSize, i);
            const isValid = this.isValidNumber(num, checkSlice);
            if (!isValid) {
                return num
            }
        }
    }

    findEncryptionWeakness() {
        const invalidNum = this.findFailingNumber();

        for (let i=0; i<this._numbers.length-1; i++) {
            let total = this._numbers[i];
            let smallest = this._numbers[i];
            let largest = this._numbers[i];
            for (let j=i+1; j<this._numbers.length; j++) {
                total += this._numbers[j];
                if (smallest > this._numbers[j]) {
                    smallest = this._numbers[j];
                }
                if (largest < this._numbers[j]) {
                    largest = this._numbers[j];
                }
                if (total === invalidNum) {
                    return largest + smallest;
                }
            }
        }
    }
}

module.exports = Cipher;