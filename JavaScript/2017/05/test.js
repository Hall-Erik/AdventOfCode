const chai = require('chai');

const Maze = require('./maze');

chai.should();

describe('Week 5 tests', () => {
    describe('Part 1 tests', () => {
        before(() => {
            test_input = [
                0,
                3,
                0,
                1,
                -3,
            ];
            maze = new Maze(test_input);
        });
    
        it('new maze should be at pos 0', () => {
            maze.pos.should.eql(0);
        });
    
        it('new maze should have 0 steps', () => {
            maze.steps.should.eql(0);
        });
    
        it('after one step, steps should be 1', () => {
            maze.step();
            maze.steps.should.eql(1);
        });
    
        it('after one step, pos should be 0', () => {
            maze.pos.should.eql(0);
        });
    
        it('after two steps, pos should be 1', () => {
            maze.step();
            maze.pos.should.eql(1);
        });
    
        it('after three steps, pos should be 4', () => {
            maze.step();
            maze.pos.should.eql(4);
        });
    
        it('after four steps, pos should be 1', () => {
            maze.step();
            maze.pos.should.eql(1);
        });
    
        it('after five steps, isExitFound should be true', () => {
            maze.step();
            maze.isExitFound.should.eql(true);
        });
    });
    
    describe('Part 2 tests', () => {
        before(() => {
            test_input = [
                0,
                3,
                0,
                1,
                -3,
            ];
            maze = new Maze(test_input, true);
        });

        it('part 2 should exit after 10 steps', () => {
            while(!maze.isExitFound) {
                maze.step();
            }
            maze.steps.should.eql(10);
        });
    });
});