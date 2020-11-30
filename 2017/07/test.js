const chai = require('chai');

const Node = require('./treeNode');
const {findOrphans, buildHash, getWeight} = require('./index');

chai.should();

describe('tests', () => {
    before(() => {
        testData = [
            'pbga (66)',
            'xhth (57)',
            'ebii (61)',
            'havc (66)',
            'ktlj (57)',
            'fwft (72) -> ktlj, cntj, xhth',
            'qoyq (66)',
            'padx (45) -> pbga, havc, qoyq',
            'tknk (41) -> ugml, padx, fwft',
            'jptl (61)',
            'ugml (68) -> gyxo, ebii, jptl',
            'gyxo (61)',
            'cntj (57)',
        ];
    });

    describe('Node tests', () => {
        it('Node("pbga (66)") should have name "pbga"', () => {
            const node = new Node(testData[0]);
            node.name.should.eql('pbga');
        });

        it('Node("pbga (66)") should have weight 66', () => {
            const node = new Node(testData[0]);
            node.weight.should.eql(66);
        });

        it('Node("pbga (66)") should have no children', () => {
            const node = new Node(testData[0]);
            node.children.should.eql([]);
        });

        it('Node("fwft (72) -> ktlj, cntj, xhth") should have name "fwft"', () => {
            const node = new Node(testData[5]);
            node.name.should.eql('fwft');
        });

        it('Node("fwft (72) -> ktlj, cntj, xhth") should have weight 243', () => {
            const node = new Node(testData[5]);
            const nodeHash = buildHash(testData);
            node.setChildren(nodeHash);
            node.weight.should.eql(243);
        });

        it('Node("fwft (72) -> ktlj, cntj, xhth") should have children ktlj, cntj, xhth', () => {
            const node = new Node(testData[5]);
            node.children.should.eql(['ktlj', 'cntj', 'xhth']);
        });
    });

    describe('Find Orphans tests', () => {
        it('find orphans should return an array', () => {
            const orphans = findOrphans(testData);
            orphans.should.be.an('array');
        });

        it('array should be of length 1', () => {
            const orphans = findOrphans(testData);

            orphans.length.should.eql(1);
        });

        it('tknk should be the first element', () => {
            const orphans = findOrphans(testData);
            orphans[0].name.should.eql('tknk');
        });
    });

    describe('Get Weight tests', () => {
        before(() => {
            nodeHash = buildHash(testData);
            rootNode = findOrphans(testData)[0];
            rootNode.setChildren(nodeHash);
        });

        it('weight of gyxo should be 61', () => {
            nodeHash['gyxo'].weight.should.eql(61);
        });

        it('weight of ugml should be 251', () => {
            nodeHash['ugml'].weight.should.eql(251);
        });

        it('weight of padx should be 243', () => {
            nodeHash['padx'].weight.should.eql(243);
        });

        it('weight of fwft should be 243', () => {
            nodeHash['fwft'].weight.should.eql(243);
        });

        it('weight of root should be 778', () => {
            rootNode.weight.should.eql(778);
        });
    });
});