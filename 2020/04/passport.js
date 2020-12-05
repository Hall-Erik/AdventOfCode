class Passport {
    constructor (ppString, validate=false) {
        this._validate = validate;
        this._ppItems = {};
        ppString.split(' ').forEach((pair) => {
            const kv = pair.split(':');
            this._ppItems[kv[0]] = kv[1];
        });
    }

    get items() {
        return this._ppItems;
    }

    isbyrValid() {
        // byr (Birth Year) - four digits; at least 1920 and at most 2002.
        const byr = Number(this._ppItems['byr']);
        return (byr >= 1920 && byr <= 2002);
    }

    isiyrValid() {
        // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
        const iyr = Number(this._ppItems['iyr']);
        return (iyr >= 2010 && iyr <= 2020);
    }

    iseyrValid() {
        // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
        const eyr = Number(this._ppItems['eyr']);
        return (eyr >= 2020 && eyr <= 2030);
    }

    ishgtValid() {
        // hgt (Height) - a number followed by either cm or in:
        //         If cm, the number must be at least 150 and at most 193.
        //         If in, the number must be at least 59 and at most 76.
        const hgtMatch = /^\d+(cm|in)$/;
        const hgt = this._ppItems['hgt'];
        if (!hgt.match(hgtMatch)) return false;
        const hgtOnly = Number(hgt.replace('in', '').replace('cm', ''));
        if (hgt.includes('cm')) {
            if (hgtOnly < 150 || hgtOnly > 193) return false;
        } else {
            if (hgtOnly < 59 || hgtOnly > 76) return false;
        }
        return true;
    }

    ishclValid() {
        // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        const hclMatch = /^#[a-f0-9]{6}$/;
        const hcl = this._ppItems['hcl'];
        return !(!hcl.match(hclMatch));
    }

    iseclValid() {
        // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
        const ecl = this._ppItems['ecl'];
        return (eyeColors.includes(ecl));
    }

    ispidValid() {
        // pid (Passport ID) - a nine-digit number, including leading zeroes.
        const pidMatch = /^\d{9}$/;
        const pid = this._ppItems['pid'];
        return !(!pid.match(pidMatch));
    }

    isDataValid() {
        const checks = [
            this.isbyrValid(),
            this.isiyrValid(),
            this.iseyrValid(),
            this.ishgtValid(),
            this.ishclValid(),
            this.iseclValid(),
            this.ispidValid(),
        ];

        for (let check of checks) {
            if (!check) {
                return false;
            }
        }        

        // cid (Country ID) - ignored, missing or not.
        // noop

        return true;
    }

    isValid() {
        const fields = [
            'byr',
            'iyr',
            'eyr',
            'hgt',
            'hcl',
            'ecl',
            'pid',
            // 'cid',  // "nobody will mind if we ignore this field"
        ];

        for (let key of fields) {
            if (!(key in this._ppItems)) {
                return false;
            }
        }

        return (this._validate) ? this.isDataValid() : true;
    }
}

module.exports = Passport;
