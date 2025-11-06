/**
 * Returns sqrt of the larges number in circumference
 * @param {*} num starting number
 */
function getNearestSquareRoot(num) {
    let i = 1;
    while(true) {
        if (i * i >= num) return i;
        i += 2;
    }
}

/**
 * Returns the smallest number in the circumference
 * @param {*} num sqrt of the largest number in circumference
 */
function getMinInCirc(num) {
    if (num == 1) return 1;
    let base = num - 2;
    return (base * base) + 1;
}

if (require.main === module) {
    let position = 361527;
}

/**
 * Get dist from center to nearest point on the ring
 * @param {number} num 
 */
function getRadius(num) {
    let sqrt = getNearestSquareRoot(num);
    return (sqrt - 1) / 2;
}

/**
 * Get the highest corner of the side containing num
 * @param {number} num 
 */
function getHighestCorner(num) {
    if (num === 1) return 1;
    let maxSqrt = getNearestSquareRoot(num);
    let lowest = getMinInCirc(maxSqrt);
    let highest = maxSqrt * maxSqrt;
    
    let curr = lowest;
    do {
        curr = curr + (maxSqrt - 2);
        if (curr >= num) return curr;
    } while (curr <= highest);
}

/**
 * Get the middle point of the side containing num
 * @param {number} num 
 */
function getMiddleOfSide(num) {
    if (num === 1) return 1;
    let highestCorner = getHighestCorner(num);
    let diff = getRadius(num);
    return highestCorner - diff;
}

/**
 * Get Distance from middle of the side containing num
 * @param {number} num 
 */
function getDistFromMidOfSide(num) {
    if (num === 1) return 0;
    let mid = getMiddleOfSide(num);
    return Math.abs(num - mid);
}

/**
 * Get Manhattan distance from center to num
 * @param {number} num 
 */
function part1(num) {
    return getRadius(num) + getDistFromMidOfSide(num);
}

if (require.main === module) {
    console.log(part1(361527));
}

module.exports = {
    getNearestSquareRoot: getNearestSquareRoot,
    getMinInCirc: getMinInCirc,
    getRadius: getRadius,
    getHighestCorner: getHighestCorner,
    getMiddleOfSide: getMiddleOfSide,
    getDistFromMidOfSide, getDistFromMidOfSide,
    part1: part1,
}