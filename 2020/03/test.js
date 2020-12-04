const chai = require('chai');

const Map = require('./map');

chai.should();

const testData = [
    '..##.......',
    '#...#...#..',
    '.#....#..#.',
    '..#.#...#.#',
    '.#...##..#.',
    '..#.##.....',
    '.#.#.#....#',
    '.#........#',
    '#.##...#...',
    '#...##....#',
    '.#..#...#.#',
];

describe('Tests', () => {
    before(() => {
        map = new Map(testData);
    });

    describe('Map tests', () => {
        it('Map should contain 37 trees.', () => {
            map.map.length.should.eql(37);
        });

        it('Map should have a tree at 0,1', () => {
            map.hasTreeAt(0, 1).should.eql(true);
        });

        it('Map should have a tree at 10,10', () => {
            map.hasTreeAt(10, 10).should.eql(true);
        });

        it('Map should have a tree at 5,5', () => {
            map.hasTreeAt(5, 5).should.eql(true);
        });

        it('Map should not have a tree at 0,0', () => {
            map.hasTreeAt(0, 0).should.eql(false);
        });

        it('Map should have a tree at 13,0', () => {
            map.hasTreeAt(13, 0).should.eql(true);
        });

        it('Map should have a tree at 22,8', () => {
            map.hasTreeAt(22, 8).should.eql(true);
        });
    });

    describe('Count trees tests', () => {
        it('Slope right 3 down 1 should encounter 7 trees', () => {
            map.countTrees(3, 1).should.eql(7);
        });
    });
});