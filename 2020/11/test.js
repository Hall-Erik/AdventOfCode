const chai = require('chai');

const Seat = require('./seat');
const Lobby = require('./lobby');

chai.should();

describe('Tests', () => {
    before(() => {
        testSeats = 'L.LL.LL.LL\n'
                  + 'LLLLLLL.LL\n'
                  + 'L.L.L..L..\n'
                  + 'LLLL.LL.LL\n'
                  + 'L.LL.LL.LL\n'
                  + 'L.LLLLL.LL\n'
                  + '..L.L.....\n'
                  + 'LLLLLLLLLL\n'
                  + 'L.LLLLLL.L\n'
                  + 'L.LLLLL.LL\n';
    });

    describe('Lobby tests', () => {
        describe('Initial state tests', () => {
            before(() => {
                lobby = new Lobby(testSeats);
            });

            it('lobby should have 71 seats', () => {
                lobby.seats.length.should.eql(71);
            });

            it('all seats should not be occupied', () => {
                for (let seat of lobby.seats) {
                    seat.occupied.should.be.false;
                }
            });

            it('lobby occupiedSeats should be 0', () => {
                lobby.occupiedSeats.should.eql(0);
            });

            it('all seats should not have changed', () => {
                for (let seat of lobby.seats) {
                    seat.changed.should.be.false;
                }
            });
        });

        describe('After run tests', () => {
            before(() => {
                lobby = new Lobby(testSeats);
                lobby.run();
            });

            it('after run lobby should have 37 occupied seats', () => {
                lobby.occupiedSeats.should.eql(37);
            });
        });

        describe('After run tests new rules', () => {
            before(() => {
                lobby = new Lobby(testSeats, true);
                lobby.run();
            });

            it('after run lobby should have 26 occupied seats', () => {
                lobby.occupiedSeats.should.eql(26);
            });
        });
    });
});
