function equals(arr1, arr2) {
    if (arr1.length === arr2.length &&
        arr1.every((i, n) => {
            return i === arr2[n];
        })
    ) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    equals: equals
};