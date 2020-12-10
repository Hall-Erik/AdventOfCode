class Loader {
    constructor (codeStr) {
        this._acc = 0;
        this._pos = 0;
        this._seenPos = new Set();
        this._program = codeStr.split('\n').slice(0, -1).map(line => line.split(' '));
        for (let line=0; line<this._program.length; line++) {
            this._program[line].push(line);
        }
    }

    runProgram() {
        while (!this._seenPos.has(this._pos)) {
            let cmd = this._program[this._pos][0];
            let val = Number(this._program[this._pos][1]);
            let lineNo = this._program[this._pos][2];
            switch(cmd) {
                case 'nop':
                    this._pos++;
                    break;
                case 'jmp':
                    this._pos += val;
                    break;
                case 'acc':
                    this._pos++;
                    this._acc += val;
                    break;
            }            
            this._seenPos.add(lineNo);
        }
    }

    get acc() {
        return this._acc;
    }
}

module.exports = Loader;
