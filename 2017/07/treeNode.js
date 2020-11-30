class Node {
    constructor (nodeStr) {
        const nodeArr = nodeStr.replace(/\(/g, '')
                               .replace(/\)/g, '')
                               .replace(/-/g, '')
                               .replace(/> /g, '')
                               .replace(/,/g, '')
                               .split(' ');
        this._name = nodeArr[0];
        this._weight = Number(nodeArr[1]);
        if (nodeArr.length > 2) {
            this._children = nodeArr.slice(2);
        } else {
            this._children = [];
        }
    }

    get name() {
        return this._name;
    }

    get weight() {
        let weight = this._weight;
        for (let child of this._children) {
            weight += child.weight;
        }
        return weight;
    }

    setChildren(nodeHash) {
        for (let i=0; i<this._children.length; i++) {
            this._children[i] = nodeHash[this._children[i]];
            this._children[i].setChildren(nodeHash);
        }
    }

    get children() {
        return this._children;
    }
 }

 module.exports = Node;