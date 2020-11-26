const {equals} = require('./common');

function isValidPassphrase(passPhrase) {
    const noDups = [...new Set(passPhrase)];
    return (passPhrase.length > 1 && equals(passPhrase, noDups));
}

module.exports = {
    isValidPassphrase: isValidPassphrase
};