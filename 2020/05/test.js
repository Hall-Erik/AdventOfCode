const chai = require('chai');

const BoardingPass = require('./boardingPass');

chai.should();

describe('Tests', () => {
    describe('Boarding pass tests', () => {
        describe('Row, Col tests', () => {
            it('FBFBBFFRLR should have row 44 col 5', () => {
                const pass = new BoardingPass('FBFBBFFRLR');
                pass.row.should.eql(44);
                pass.col.should.eql(5);
            });
    
            it('BFFFBBFRRR should have row 70 col 7', () => {
                const pass = new BoardingPass('BFFFBBFRRR');
                pass.row.should.eql(70);
                pass.col.should.eql(7);
            });
    
            it('FFFBBBFRRR should have row 14 col 7', () => {
                const pass = new BoardingPass('FFFBBBFRRR');
                pass.row.should.eql(14);
                pass.col.should.eql(7);
            });
    
            it('BBFFBBFRLL should have row 102 col 4', () => {
                const pass = new BoardingPass('BBFFBBFRLL');
                pass.row.should.eql(102);
                pass.col.should.eql(4);
            });
        });

        describe('Seat ID tests', () => {
            it('BFFFBBFRRR should have seatID 567', () => {
                const pass = new BoardingPass('BFFFBBFRRR');
                pass.seatID.should.eql(567);
            });
    
            it('FFFBBBFRRR should have seatID 119', () => {
                const pass = new BoardingPass('FFFBBBFRRR');
                pass.seatID.should.eql(119);
            });
    
            it('BBFFBBFRLL should have seatID 820', () => {
                const pass = new BoardingPass('BBFFBBFRLL');
                pass.seatID.should.eql(820);
            });
        });
    });
});
