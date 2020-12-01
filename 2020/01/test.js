const chai = require('chai');

const {
    findEntriesThatSumTo2020,
    findThreeEntries,
    getProduct
} = require('./index');

chai.should();

describe('Tests', () => {
    before(() => {
        testData = [
            1721,
            979,
            366,
            299,
            675,
            1456,
        ];
    });

    describe('Find entries', () => {
        before(() => {
            entries = findEntriesThatSumTo2020(testData);
        });

        it('entries should be an array', () => {
            entries.should.be.an('array');
        });

        it('entries should be of length 2', () => {
            entries.length.should.eql(2);
        });

        it('1721 should be an entry', () => {
            entries.should.include(1721);
        });

        it('299 should be an entry', () => {
            entries.should.include(299);
        });
    });

    describe('Get product', () => {
        it('product of [1721, 299] should be 514579', () => {
            entries = findEntriesThatSumTo2020(testData);
            getProduct(entries).should.eql(514579);
        });

        it('product of [979, 366, 675] should be 241861950', () => {
            entries = findThreeEntries(testData);
            getProduct(entries).should.eql(241861950);
        });
    });

    describe('Find three entries', () => {
        before(() => {
            entries = findThreeEntries(testData);
        });

        it('entries should be an array', () => {
            entries.should.be.an('array');
        });

        it('entries should be of length 3', () => {
            entries.length.should.eql(3);
        });

        it('979 should be an entry', () => {
            entries.should.include(979);
        });

        it('366 should be an entry', () => {
            entries.should.include(366);
        });

        it('675 should be an entry', () => {
            entries.should.include(675);
        });
    });
});