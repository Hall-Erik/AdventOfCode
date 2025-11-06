const chai = require('chai');
const app = require('./index');

chai.should();

describe('Function Tests', function () {

    describe('Get Nearest Power Tests', function () {
        it('1 should return 1', function () {
            app.getNearestSquareRoot(1).should.equal(1);
        });

        it('2 should be 3', function () {
            app.getNearestSquareRoot(2).should.equal(3);
        });

        it('3 should be 3', function () {
            app.getNearestSquareRoot(3).should.equal(3);
        });

        it('10 should be 5', function () {
            app.getNearestSquareRoot(10).should.equal(5);
        });

        it('15 should be 5', function () {
            app.getNearestSquareRoot(15).should.equal(5);
        });

        it('13 should be 5', function () {
            app.getNearestSquareRoot(13).should.equal(5);
        })
    });

    describe('Get Min In Circ Tests', function () {
        it('1 should be 1', function () {
            app.getMinInCirc(1).should.equal(1);
        });

        it('3 should be 2', function () {
            app.getMinInCirc(3).should.equal(2);
        });

        it('5 should be 10', function () {
            app.getMinInCirc(5).should.equal(10);
        });

        it('7 should be 26', function () {
            app.getMinInCirc(7).should.equal(26);
        });
    });

    describe('Get Radius Tests', function () {
        it('1 should be 0', function () {
            app.getRadius(1).should.equal(0);
        });

        it('2 should be 1', function () {
            app.getRadius(2).should.equal(1);
        });

        it('9 should be 1', function () {
            app.getRadius(9).should.equal(1);
        });

        it('11 should be 2', function () {
            app.getRadius(11).should.equal(2);
        });

        it('13 should be 2', function () {
            app.getRadius(13).should.equal(2);
        });
    });

    describe('Get Highest Corner Tests', function () {
        it('1 should be 1', function() {
            app.getHighestCorner(1).should.equal(1);
        });

        it('2 should be 3', function() {
            app.getHighestCorner(2).should.equal(3);
        });

        it('3 should be 3', function() {
            app.getHighestCorner(3).should.equal(3);
        });

        it('23 should be 25', function() {
            app.getHighestCorner(23).should.equal(25);
        });
    });

    describe('Get Middle of Side Tests', function () {
        it('1 should be 1', function () {
            app.getMiddleOfSide(1).should.equal(1);
        });

        it('2 should be 2', function () {
            app.getMiddleOfSide(2).should.equal(2);
        });

        it('10 should be 11', function () {
            app.getMiddleOfSide(10).should.equal(11);
        });

        it('25 should be 23', function () {
            app.getMiddleOfSide(25).should.equal(23);
        });
    });

    describe('Get Dist from Middle of Side Tests', function () {
        it('1 should be 0', function () {
            app.getDistFromMidOfSide(1).should.equal(0);
        });

        it('2 should be 0', function () {
            app.getDistFromMidOfSide(2).should.equal(0);
        });

        it('3 should be 1', function () {
            app.getDistFromMidOfSide(3).should.equal(1);
        });

        it('25 should be 2', function () {
            app.getDistFromMidOfSide(25).should.equal(2);
        });
    });
});

describe('Puzzle Tests', function () {
    describe('Part 1 Tests', function () {
        it('1 is carried 0 steps', function () {
            app.part1(1).should.equal(0);
        });

        it('12 is carried 3 steps', function () {
            app.part1(12).should.equal(3);
        });

        it('23 is carried 2 steps', function () {
            app.part1(23).should.equal(2);
        });

        it('1024 is carried 31 steps', function () {
            app.part1(1024).should.equal(31);
        });
    });

    describe.skip('Part 2 Tests', function () {

    });
})