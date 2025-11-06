const chai = require('chai');

const Bus = require('./bus');
const {findEarliestBus} = require('./index');

chai.should();

describe('Tests', () => {
    before(() => {
        testNotes = '939\n'
                  + '7,13,x,x,59,x,31,19\n';
    });

    describe('Bus tests', () => {
        it('Bus(7) should have 0 wait time from 7', () => {
            const bus = new Bus(7);
            bus.getWaitTime(7).should.eql(0);
        });

        it('Bus(7) should have 6 wait time from 8', () => {
            const bus = new Bus(7);
            bus.getWaitTime(8).should.eql(6);
        });

        it('Bus(7) should have 5 wait time from 9', () => {
            const bus = new Bus(7);
            bus.getWaitTime(9).should.eql(5);
        });

        it('Bus(7) should have 0 wait time from 21', () => {
            const bus = new Bus(7);
            bus.getWaitTime(21).should.eql(0);
        });
    });

    describe('findEarliestBus tests', () => {
        it('bus 59 should be the earliest', () => {
            const busses = [
                new Bus(7),
                new Bus(13),
                new Bus(59),
                new Bus(31),
                new Bus(19),
            ];
            findEarliestBus(939, busses).id.should.eql(59);
        });

        it('earliest bus ID * wait time should be 295', () => {
            const busses = [
                new Bus(7),
                new Bus(13),
                new Bus(59),
                new Bus(31),
                new Bus(19),
            ];
            const earliest = findEarliestBus(939, busses);
            (earliest.id * earliest.getWaitTime(939)).should.eql(295);
        });
    });

});