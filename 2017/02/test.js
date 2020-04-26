const assert = require('chai').assert;

const app = require('./index');


describe('Part 1', () => {
    describe('Get row checksums', () => {
        /**
         (5 1 9 5): 9 - 1 = 8
         (7 5 3): 7 - 3 = 4
         (2 4 6 8): 8 - 2 = 6
         */
        it('(5 1 9 5) should return 8', () => {
            assert.equal(app.get_row_check([5, 1, 9, 5]), 8);
        });
    
        it('(7 5 3) should return 4', () => {
            assert.equal(app.get_row_check([7, 5, 3]), 4);
        });
    
        it('(2 4 6 8) should return 6', () => {
            assert.equal(app.get_row_check([2, 4, 6, 8]), 6);
        });
    });

    describe('Get spreadsheet checksum', () => {
        /**
         * 8 + 4 + 6 = 18
         */
        it('(8 4 6) should return 18', () => {
            assert.equal(app.get_sheet_check([8, 4, 6]), 18);
        });
    });
});

describe('Part 2', () => {
    describe('Get row checksums', () => {
        /**
         (5 9 2 8): 8 / 2 = 4
         (9 4 7 3): 9 / 3 = 3
         (3 8 6 5): 6 / 3 = 2
         */
        it('(5 9 2 8) should return 4', () => {
            assert.equal(app.get_row_div_check([5, 9, 2, 8]), 4);
        });
    
        it('(9 4 7 3) should return 3', () => {
            assert.equal(app.get_row_div_check([9, 4, 7, 3]), 3);
        });
    
        it('(3 8 6 5) should return 2', () => {
            assert.equal(app.get_row_div_check([3, 8, 6, 5]), 2);
        });
    });

    describe('Get spreadsheet checksum', () => {
        /**
         * 4 + 3 + 2 = 9
         */
        it('(4 3 2) should return 9', () => {
            assert.equal(app.get_sheet_check([4, 3, 2]), 9);
        });
    });
});
