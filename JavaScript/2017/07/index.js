const fs = require('fs');

const Node = require('./treeNode');

function findOrphans(nodeStrings) {
    const nodes = nodeStrings.map((nodeString) => {
        return new Node(nodeString);
    });

    const children = [];
    for (let node of nodes) {
        for (let child of node.children) {
            children.push(child);
        }
    }

    return nodes.filter((node) => {
        return !children.includes(node.name);
    });
}

function buildHash(nodeStrings) {
    const nodes = nodeStrings.map((nodeString) => {
        return new Node(nodeString);
    });

    nodeHash = {};

    for (let node of nodes) {
        nodeHash[node.name] = node;
    }

    return nodeHash;
}

function checkBalance(rootNode) {
    for (let child of rootNode.children) {
        console.log(child.weight);
    }
}

const lines = fs.readFileSync('input.txt').toString().split('\n').slice(0, -1);

const orphan = findOrphans(lines)[0];

console.log(`Root node is ${orphan.name}`);

const nodesHash = buildHash(lines);
orphan.setChildren(nodesHash);

checkBalance(orphan.children[1]); // not balanced

checkBalance(orphan.children[1].children[4]); // balanced


module.exports = {
    findOrphans: findOrphans,
    buildHash: buildHash,
    checkBalance: checkBalance,
};