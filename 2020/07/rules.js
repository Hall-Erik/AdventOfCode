class Child {
    constructor (childStr) {
        let childArr = childStr.split(' ');
        this._count = (childArr[0] === 'no') ? 0 : Number(childArr[0]);
        if (this._count !== 0) {
            if (childArr[3] === 'bag') {
                childArr[3] = 'bags';
            }

            this._name = childArr.slice(1).join(' ');
        }
    }

    get name() {
        return this._name;
    }

    get count() {
        return this._count;
    }
}

class Bag {
    constructor (bagStr) {
        let bagArr = bagStr.replace('.', '').split(' contain ');
        this._name = bagArr[0];
        this._children = bagArr[1].split(', ').map((child) => {
            return new Child(child)
        });
    }

    get name() {
        return this._name;
    }

    get children() {
        return this._children;
    }
}

class Rules {
    constructor (rulesStr) {
        this._rules = {};
        const rulesArr = rulesStr.split('\n').slice(0, -1);
        for (let rule of rulesArr) {
            const bag = new Bag(rule);
            this._rules[bag.name] = bag;
        }
    }

    /**
     * Check if a child is nested in {{bag}}
     * @param {Bag} bag to check for child
     * @param {str} childName check for this child.name
     * @return {boolean}
     */
    findChild(bag, childName) {
        let contains = false;

        if (bag.name === childName) {
            return true;
        }        

        for (let bagName of bag.children) {
            if (!bagName.name) {
                continue;
            }
            let child = this._rules[bagName.name];
            if (this.findChild(child, childName)) {
                return true;
            }
        }

        return contains;
    }

    /**
     * How many bags can contain {{bagType}}
     * @param {str} bagType "shiny gold bags"
     * @return {number} number of bags that contain {{bagType}}
     */
    count(bagType) {
        let count = 0;
        for (let bagName of Object.keys(this._rules)) {
            let bag = this._rules[bagName];
            if (bag.name === bagType) {
                continue
            }
            if (this.findChild(bag, bagType)) {
                count++;
            }
        }

        return count;
    }

    countChildren(bag) {
        const children = bag.children.filter(child => child.count !== 0);
        let count = 1;
        for (let child of children) {
            const childBag = this._rules[child.name];
            count += (child.count * this.countChildren(childBag));
        }
        return count;
    }

    /**
     * A single {{bagType}} must contain {{return}} bags
     * @param {str} bagType "shiny gold bags"
     * @return {number} nested count of bags contained in {{bagType}}
     */
    countNested(bagType) {
        const bag = this._rules[bagType];
        let count = this.countChildren(bag) -1;
        return count;
    }

    get rules() {
        return this._rules;
    }
}

module.exports = Rules;