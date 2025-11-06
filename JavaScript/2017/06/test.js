const chai = require('chai');

const Board = require('./board');

chai.should();

describe('Board tests', () => {
    describe('Step through test game tests', () => {
        before(() => {
            board = new Board('0\t2\t7\t0');
        });
        
        it('third bank should be the largest', () => {
            board.findLargest().should.eql(2);
        });
    
        it('initial board should be 0, 2, 7, 0', () => {
            board.banks.should.eql([0, 2, 7, 0]);
        });
    
        it('after one move, banks should be 2, 4, 1, 2', () => {
            board.makeMove();
            board.banks.should.eql([2, 4, 1, 2]);
        });
    
        it('after two moves, banks should be 3, 1, 2, 3', () => {
            board.makeMove();
            board.banks.should.eql([3, 1, 2, 3]);
        });

        it('after three moves, banks should be 0, 2, 3, 4', () => {
            board.makeMove();
            board.banks.should.eql([0, 2, 3, 4]);
        });

        it('after four moves, banks should be 1, 3, 4, 1', () => {
            board.makeMove();
            board.banks.should.eql([1, 3, 4, 1]);
        });

        it('after five moves, banks should be 2, 4, 1, 2', () => {
            board.makeMove();
            board.banks.should.eql([2, 4, 1, 2]);
        });

        it('after five moves, the puzzle should be finished', () => {
            board.done.should.eql(true);
            board.moves.should.eql(5);
        });
    });

    describe('Find size of loop tests', () => {
        before(() => {
            board = new Board('0\t2\t7\t0');
            while (!board.done) {
                board.makeMove();
            }
            board.reset();
        });

        it('after reset, moves should be zero', () => {
            board.moves.should.eql(0);
        });

        it('after reset, done should be false', () => {
            board.done.should.eql(false);
        });

        it('after reset, board should be 2, 4, 1, 2', () => {
            board.banks.should.eql([2, 4, 1, 2]);
        });

        it('loop should be 4 cycles', () => {
            while (!board.done) {
                board.makeMove();
            }
            board.moves.should.eql(4);
        })
    });
});