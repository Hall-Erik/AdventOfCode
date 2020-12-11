const chai = require('chai');

const Cipher = require('./cipher');

chai.should();

describe('Tests', () => {
    before(() => {
        testNumbers = [
            35,
            20,
            15,
            25,
            47,
            40,
            62,
            55,
            65,
            95,
            102,
            117,
            150,
            182,
            127,
            219,
            299,
            277,
            309,
            576,
        ];
    });

    describe('Cipher tests', () => {
        it('first failing number should be 127', () => {
            const cipher = new Cipher(testNumbers, 5);
            cipher.findFailingNumber().should.eql(127);
        });

        it('encryption weakness should be 62', () => {
            const cipher = new Cipher(testNumbers, 5);
            cipher.findEncryptionWeakness().should.eql(62);
        });
    });
});