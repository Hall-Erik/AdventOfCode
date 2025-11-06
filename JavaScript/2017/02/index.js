const fs = require('fs');

function get_row_check(row) {
    let min = Math.min(...row),
        max = Math.max(...row);
    return max - min;
}

function get_row_div_check(row) {
    let quotient = row.reduce(function (acc, curr_item) {
        return acc + row.filter(function (divisible_item) {
            return divisible_item < curr_item && curr_item % divisible_item == 0;
        }).reduce(function (acc, inner_curr) {
            return acc + Math.floor(curr_item/inner_curr);
        }, 0);
    }, 0)
    return quotient;
}

function get_sheet_check(checks) {
    return checks.reduce((a, b) => {return a + b;});
}

if (require.main === module) {
    let checks = [];
    let division_checks = [];
    lines = fs.readFileSync('input.txt', 'utf8');
    lines = lines.trim().split('\n');
    for (line of lines) {
        line = line.split('\t')
                   .map(x => parseInt(x));
        checks.push(get_row_check(line));
        division_checks.push(get_row_div_check(line));
    }
    
    console.log('Part 1:');
    console.log(`Spreadsheet checksum: ${get_sheet_check(checks)}`);
    console.log('\nPart 2:');
    console.log(`Spreadsheet checksum: ${get_sheet_check(division_checks)}`);
}

module.exports = {
    get_row_check: get_row_check,
    get_row_div_check: get_row_div_check,
    get_sheet_check: get_sheet_check
}