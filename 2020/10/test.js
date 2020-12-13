const chai = require('chai');

const Bag = require('./bag');

chai.should();

describe('Tests', () => {
    before(() => {
        smallTestAdapters = [
            16,
            10,
            15,
            5,
            1,
            11,
            7,
            19,
            6,
            12,
            4,
        ];

        largeTestAdapters = [
            28,
            33,
            18,
            42,
            31,
            14,
            46,
            20,
            48,
            47,
            24,
            23,
            49,
            45,
            19,
            38,
            39,
            11,
            1,
            32,
            25,
            35,
            8,
            17,
            7,
            9,
            4,
            2,
            34,
            10,
            3,
        ];
    });

    describe('Bag tests', () => {
        before(() => {
            smallBag = new Bag(smallTestAdapters);
            largeBag = new Bag(largeTestAdapters);
        });

        it('small bag chain should be 35', () => {
            smallBag.chain.should.eql(35);
        });

        it('small bag arrangements should be 8', () => {
            smallBag.arrangements.should.eql(8);
        });

        it('large bag chain should be 220', () => {
            largeBag.chain.should.eql(220);
        });

        it('large bag arrangements should be 19208', () => {
            largeBag.arrangements.should.eql(19208);
        });
    });
});