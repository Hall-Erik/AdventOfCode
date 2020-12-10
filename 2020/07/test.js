const chai = require('chai');

const Rules = require('./rules');

chai.should();

describe('Tests', () => {
    before(() => {
        testRules = 'light red bags contain 1 bright white bag, 2 muted yellow bags.\n'
                  + 'dark orange bags contain 3 bright white bags, 4 muted yellow bags.\n'
                  + 'bright white bags contain 1 shiny gold bag.\n'
                  + 'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.\n'
                  + 'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.\n'
                  + 'dark olive bags contain 3 faded blue bags, 4 dotted black bags.\n'
                  + 'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.\n'
                  + 'faded blue bags contain no other bags.\n'
                  + 'dotted black bags contain no other bags.\n';
    });

    describe('Rules tests', () => {
        it('4 bags should contain shiny gold bags', () => {
            const rules = new Rules(testRules);
            rules.count('shiny gold bags').should.eql(4);
        });

        it('A single shiny gold bag should contain 32 bags', () => {
            const rules = new Rules(testRules);
            rules.countNested('shiny gold bags').should.eql(32);
        });
    });
});