const chai = require('chai');

const Ship = require('./ship');

chai.should();

describe('Tests', () => {
    describe('Ship tests', () => {
        beforeEach(() => {
            ship = new Ship();
        });

        it('ship should be at x 0', () => {
            ship.x.should.eql(0);
        });

        it('ship should be at y 0', () => {
            ship.y.should.eql(0);
        });

        it('ship should be at heading 0', () => {
            ship.heading.should.eql(0);
        });

        it('ship should be at cardinal E', () => {
            ship.cardinal.should.eql('E');
        });

        it('E10 should move ship to 10,0', () => {
            ship.move('E10');
            ship.heading.should.eql(0);
            ship.cardinal.should.eql('E');
            ship.x.should.eql(10);
            ship.y.should.eql(0);
        });

        it('S5 should move ship to 0,-5', () => {
            ship.move('S5');
            ship.heading.should.eql(0);
            ship.cardinal.should.eql('E');
            ship.x.should.eql(0);
            ship.y.should.eql(-5);
        });

        it('N2 should move ship to 0,2', () => {
            ship.move('N2');
            ship.heading.should.eql(0);
            ship.cardinal.should.eql('E');
            ship.x.should.eql(0);
            ship.y.should.eql(2);
        });

        it('W7 should move ship to -7,0', () => {
            ship.move('W7');
            ship.heading.should.eql(0);
            ship.cardinal.should.eql('E');
            ship.x.should.eql(-7);
            ship.y.should.eql(0);
        });

        it('F1 should move ship to 1,0', () => {
            ship.move('F1');
            ship.heading.should.eql(0);
            ship.cardinal.should.eql('E');
            ship.x.should.eql(1);
            ship.y.should.eql(0);
        });

        it('L90 should turn ship to the North', () => {
            ship.move('L90');
            ship.heading.should.eql(270);
            ship.cardinal.should.eql('N');
            ship.x.should.eql(0);
            ship.y.should.eql(0);
        });

        it('R90 should turn ship to the South', () => {
            ship.move('R90');
            ship.heading.should.eql(90);
            ship.cardinal.should.eql('S');
            ship.x.should.eql(0);
            ship.y.should.eql(0);
        });

        it('R90 F10 should move ship to 0,-10', () => {
            ship.move('R90');
            ship.move('F10');
            ship.heading.should.eql(90);
            ship.cardinal.should.eql('S');
            ship.x.should.eql(0);
            ship.y.should.eql(-10);
        });

        it('F10 N3 F7 R90 F11 should move ship to 17,-8', () => {
            ship.move('F10');
            ship.move('N3');
            ship.move('F7');
            ship.move('R90');
            ship.move('F11');
            ship.heading.should.eql(90);
            ship.cardinal.should.eql('S');
            ship.x.should.eql(17);
            ship.y.should.eql(-8);
        });

        it('F10 N3 F7 R90 F11 should move ship mDistance 25 from start', () => {
            ship.move('F10');
            ship.move('N3');
            ship.move('F7');
            ship.move('R90');
            ship.move('F11');
            ship.mDistance.should.eql(25);
        });
    });
});