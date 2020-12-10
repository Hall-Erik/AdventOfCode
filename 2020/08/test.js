const chai = require('chai');

const Loader = require('./loader');

chai.should();

describe('Tests', () => {
    before(() => {
        testInput = 'nop +0\n'
                  + 'acc +1\n'
                  + 'jmp +4\n'
                  + 'acc +3\n'
                  + 'jmp -3\n'
                  + 'acc -99\n'
                  + 'acc +1\n'
                  + 'jmp -4\n'
                  + 'acc +6\n';
    });

    it('acc should be 5 before the loop repeats', () => {
        const loader = new Loader(testInput);
        loader.runProgram();
        loader.acc.should.eql(5);
    });

    it('acc should be 8 when program is fixed', () => {
        const loader = new Loader(testInput);
        loader.fixRunProgram();
        loader.acc.should.eql(8);
    });
});