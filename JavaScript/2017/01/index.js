const fs = require('fs');

module.exports = {
  part_1: part_1,
  part_2: part_2
};

function part_1(seq) {
    let i;
    let sum = 0;
    for (i = 0; i < seq.length; i++) {
        let curr = seq[i];
        let next = seq[(i + 1 ) % seq.length];
        if (curr === next) {
            sum += Number(curr);
        }
    }
    return sum;
}

function part_2(seq) {
    let i;
    let sum = 0;
    for (i = 0; i < seq.length; i++) {
        let curr = seq[i];
        let next = seq[(i + seq.length/2 ) % seq.length];
        if (curr === next) {
            sum += Number(curr);
        }
    }
    return sum;
}

if (require.main === module) {
    fs.readFile('input.txt', 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        return;
        }
        console.log('Part 1:');
        console.log(part_1(data.trim()));
        console.log('Part 2:');
        console.log(part_2(data.trim()));
    });
}