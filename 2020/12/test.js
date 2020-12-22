const chai = require('chai');

const Ship = require('./ship');
const WaypointShip = require('./waypointShip');

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

    describe.only('Waypoint Ship tests', () => {
        beforeEach(() => {
            wShip = new WaypointShip();
        });

        it('ship should be at x 0', () => {
            wShip.x.should.eql(0);
        });

        it('ship should be at y 0', () => {
            wShip.y.should.eql(0);
        });

        it('ship should be at heading 0', () => {
            wShip.heading.should.eql(0);
        });

        it('ship should be at cardinal E', () => {
            wShip.cardinal.should.eql('E');
        });

        it('ship waypoint should be at x 10', () => {
            wShip.waypointX.should.eql(10);
        });

        it('ship waypoint should be at y 1', () => {
            wShip.waypointY.should.eql(1);
        });

        it('E10 should move waypoint to 20,1', () => {
            wShip.move('E10');
            wShip.heading.should.eql(0);
            wShip.cardinal.should.eql('E');
            wShip.x.should.eql(0);
            wShip.y.should.eql(0);
            wShip.waypointX.should.eql(20);
            wShip.waypointY.should.eql(1);
        });

        it('S5 should move waypoint to 10,-4', () => {
            wShip.move('S5');
            wShip.heading.should.eql(0);
            wShip.cardinal.should.eql('E');
            wShip.x.should.eql(0);
            wShip.y.should.eql(0);
            wShip.waypointX.should.eql(10);
            wShip.waypointY.should.eql(-4);
        });

        it('N2 should move waypoint to 10,3', () => {
            wShip.move('N2');
            wShip.heading.should.eql(0);
            wShip.cardinal.should.eql('E');
            wShip.x.should.eql(0);
            wShip.y.should.eql(0);
            wShip.waypointX.should.eql(10);
            wShip.waypointY.should.eql(3);
        });

        it('W7 should move waypoint to 3,1', () => {
            wShip.move('W7');
            wShip.heading.should.eql(0);
            wShip.cardinal.should.eql('E');
            wShip.x.should.eql(0);
            wShip.y.should.eql(0);
            wShip.waypointX.should.eql(3);
            wShip.waypointY.should.eql(1);
        });

        it('L90 should turn waypoint to -1, 10', () => {
            wShip.move('L90');
            wShip.heading.should.eql(0);
            wShip.cardinal.should.eql('E');
            wShip.x.should.eql(0);
            wShip.y.should.eql(0);
            wShip.waypointX.should.eql(-1);
            wShip.waypointY.should.eql(10);
        });

        it('R90 should turn waypoint to 1, -10', () => {
            wShip.move('R90');
            wShip.heading.should.eql(0);
            wShip.cardinal.should.eql('E');
            wShip.x.should.eql(0);
            wShip.y.should.eql(0);
            wShip.waypointX.should.eql(1);
            wShip.waypointY.should.eql(-10);
        });

        it('R180 should turn waypoint to -10,-1', () => {
            wShip.move('R180');
            wShip.heading.should.eql(0);
            wShip.cardinal.should.eql('E');
            wShip.x.should.eql(0);
            wShip.y.should.eql(0);
            wShip.waypointX.should.eql(-10);
            wShip.waypointY.should.eql(-1);
        });

        it('L180 should turn waypoint to -10,-1', () => {
            wShip.move('L180');
            wShip.heading.should.eql(0);
            wShip.cardinal.should.eql('E');
            wShip.x.should.eql(0);
            wShip.y.should.eql(0);
            wShip.waypointX.should.eql(-10);
            wShip.waypointY.should.eql(-1);
        });

        it('F10 should move ship to 100,10', () => {
            wShip.move('F10');
            wShip.heading.should.eql(0);
            wShip.cardinal.should.eql('E');
            wShip.x.should.eql(100);
            wShip.y.should.eql(10);
        });


        it('F10 N3 F7 R90 F11 should move ship to 214,-72', () => {
            wShip.move('F10');
            wShip.move('N3');
            wShip.move('F7');
            wShip.move('R90');
            wShip.move('F11');
            wShip.heading.should.eql(0);
            wShip.cardinal.should.eql('E');
            wShip.x.should.eql(214);
            wShip.y.should.eql(-72);
        });

        it('F10 N3 F7 R90 F11 should move ship mDistance 286 from start', () => {
            wShip.move('F10');
            wShip.move('N3');
            wShip.move('F7');
            wShip.move('R90');
            wShip.move('F11');
            wShip.mDistance.should.eql(286);
        });
    });
});