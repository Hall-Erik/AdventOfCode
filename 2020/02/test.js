const chai = require('chai');

const Policy = require('./policy');

chai.should();

describe('Tests', () => {
    before(() => {
        testData = [
            '1-3 a: abcde',
            '1-3 b: cdefg',
            '2-9 c: ccccccccc',
        ];
    });

    describe('Policy init tests', () => {
        before(() => {
            policy = new Policy(testData[0]);
        });

        it('min should be 1', () => {
            policy.min.should.eql(1);
        });

        it('max should be 3', () => {
            policy.max.should.eql(3);
        });

        it('char should be a', () => {
            policy.char.should.eql('a');
        });

        it('password should be abcde', () => {
            policy.password.should.eql('abcde');
        });
    });

    describe('isValid Tests', () => {
        it('"1-3 a: abcde" should be valid', () => {
            policy = new Policy(testData[0]);
            policy.isValid().should.eql(true);
        });

        it('"1-3 b: cdefg" should be invalid', () => {
            policy = new Policy(testData[1]);
            policy.isValid().should.eql(false);
        });

        it('"2-9 c: ccccccccc" should be valid', () => {
            policy = new Policy(testData[2]);
            policy.isValid().should.eql(true);
        });
    });

    describe('isValidNewRules Tests', () => {
        it('"1-3 a: abcde" should be valid', () => {
            policy = new Policy(testData[0]);
            policy.isValidNewRules().should.eql(true);
        });

        it('"1-3 b: cdefg" should be invalid', () => {
            policy = new Policy(testData[1]);
            policy.isValidNewRules().should.eql(false);
        });

        it('"2-9 c: ccccccccc" should be invalid', () => {
            policy = new Policy(testData[2]);
            policy.isValidNewRules().should.eql(false);
        });
    });
});