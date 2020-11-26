const {isValidPassphrase} = require('./part1');

function hasNoAnagrams(passPhrase) {
    sorted = passPhrase.map((item) => {
        return item.split('').sort().join('');
    });
    
    return isValidPassphrase(sorted);
}

module.exports = {
    hasNoAnagrams: hasNoAnagrams
};