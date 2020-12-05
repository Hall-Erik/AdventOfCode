const fs = require('fs');

const BoardingPass = require('./boardingPass');

const passes = fs.readFileSync('input.txt', 'utf-8')
                 .split('\n')
                 .slice(0, -1)
                 .map((pass) => {
                    return new BoardingPass(pass);
                 }
);

const seatObjArr = {};
const seatIDs = passes.map((pass) => {
    seatObjArr[pass.seatID] = pass;
    return pass.seatID;
}).sort();

const highestSeatID = Math.max(...seatIDs);
const lowestSeatID = Math.min(...seatIDs);

console.log(`Highest seatID is ${highestSeatID}`);

for (let seat=lowestSeatID+1; seat<highestSeatID-1; seat++) {
    const lowNeighbor = seatObjArr[seat-1];
    const seatObj = seatObjArr[seat];
    const highNeighbor = seatObjArr[seat+1];
    if (!seatObj && !!lowNeighbor && !!highNeighbor) {
        console.log(`Your seat is ${seat}`);
    }
}
