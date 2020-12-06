const chai = require('chai');

const Group = require('./group');
const Batch = require('./batch');

chai.should();

describe('Tests', () => {
    describe('Group tests', () => {
        before(() => {
            testGroups = [
                'abc',
                'a\nb\nc',
                'ab\nac',
                'a\na\na\na\n',
                'b',
            ];
        });

        describe('"anyoe" answers yes tests', () => {
            it('First group should have 3 answers', () => {
                const grop = new Group(testGroups[0]);
                grop.countAnswers().should.eql(3);
            });
    
            it('Second group should have 3 answers', () => {
                const grop = new Group(testGroups[1]);
                grop.countAnswers().should.eql(3);
            });
    
            it('Third group should have 3 answers', () => {
                const grop = new Group(testGroups[2]);
                grop.countAnswers().should.eql(3);
            });
    
            it('Fourth group should have 1 answer', () => {
                const grop = new Group(testGroups[3]);
                grop.countAnswers().should.eql(1);
            });
    
            it('Fifth group should have 1 answer', () => {
                const grop = new Group(testGroups[4]);
                grop.countAnswers().should.eql(1);
            });
        });

        describe('"everyone" answers yes tests', () => {
            it('First group should have 3 answers', () => {
                const grop = new Group(testGroups[0], true);
                grop.countAnswers().should.eql(3);
            });
    
            it('Second group should have 0 answers', () => {
                const grop = new Group(testGroups[1], true);
                grop.countAnswers().should.eql(0);
            });
    
            it('Third group should have 1 answers', () => {
                const grop = new Group(testGroups[2], true);
                grop.countAnswers().should.eql(1);
            });
    
            it('Fourth group should have 1 answer', () => {
                const grop = new Group(testGroups[3], true);
                grop.countAnswers().should.eql(1);
            });
    
            it('Fifth group should have 1 answer', () => {
                const grop = new Group(testGroups[4], true);
                grop.countAnswers().should.eql(1);
            });
        });
    });
    
    describe('Batch tests', () => {
        before(() => {
            testGroups = 'abc\n\n'
    
                       + 'a\n'
                       + 'b\n'
                       + 'c\n\n'
            
                       + 'ab\n'
                       + 'ac\n\n'
            
                       + 'a\n'
                       + 'a\n'
                       + 'a\n'
                       + 'a\n\n'
            
                       + 'b\n';
        });

        describe('"anyone" answers yes tests', () => {
            it('Test batch should have 11 answers', () => {
                const batch = new Batch(testGroups);
                batch.countGroupAnswers().should.eql(11);
            });
        });

        describe('"everyone" answers yes test', () => {
            it('Test batch should have 6 answers', () => {
                const batch = new Batch(testGroups, true);
                batch.countGroupAnswers().should.eql(6);
            });
        });
    });
});