const assert = require('chai').assert;

const app = require('./index');


describe('Part 1', () => {
    it('1122 should return 3', () => {
        assert.equal(app.part_1('1122'), 3);
    });

    it('1111 should return 4', () => {
        assert.equal(app.part_1('1111'), 4);
    });

    it('1234 should return 0', () => {
        assert.equal(app.part_1('1234'), 0);
    });

    it('91212129 should return 9', () => {
        assert.equal(app.part_1('91212129'), 9);
    });
});

describe('Part 2', () => {
    it('1212 should return 6', () => {
        assert.equal(app.part_2('1212'), 6);
    });

    it('1221 should return 0', () => {
        assert.equal(app.part_2('1221'), 0);
    });

    it('123425 should return 4', () => {
        assert.equal(app.part_2('123425'), 4);
    });

    it('123123 should return 12', () => {
        assert.equal(app.part_2('123123'), 12);
    });

    it('12131415 should return 4', () => {
        assert.equal(app.part_2('12131415'), 4);
    });
});
