const chai = require('chai');

const Batch = require('./batch');
const Passport = require('./passport');

chai.should();

describe('Tests', () => {
    before(() => {
        testData = 'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n'
                 + 'byr:1937 iyr:2017 cid:147 hgt:183cm\n\n'

                 + 'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\n'
                 + 'hcl:#cfa07d byr:1929\n\n'

                 + 'hcl:#ae17e1 iyr:2013\n'
                 + 'eyr:2024\n'
                 + 'ecl:brn pid:760753108 byr:1931\n'
                 + 'hgt:179cm\n\n'

                 + 'hcl:#cfa07d eyr:2025 pid:166559648\n'
                 + 'iyr:2011 ecl:brn hgt:59in\n';
    });

    describe('Batch tests', () => {
        before(() => {
            batch = new Batch(testData);
        });

        it('2 passports should be valid', () => {
            batch.countValid().should.eql(2);
        });
    });

    describe('Passport tests', () => {
        before(() => {
            batch = new Batch(testData);
        });

        it('first passport should have 8 fields', () => {
            const pp = batch.passports[0];
            pp.items.should.have.all.keys(
                'ecl',
                'pid',
                'eyr',
                'hcl',
                'byr',
                'iyr',
                'cid',
                'hgt',
            );
        });

        it('second passport should have 7 fields', () => {
            const pp = batch.passports[1];
            pp.items.should.have.all.keys(
                'hcl',
                'iyr',
                'ecl',
                'cid',
                'eyr',
                'pid',
                'byr',
            );
        });

        it('third passport should have 7 fields', () => {
            const pp = batch.passports[2];
            pp.items.should.have.all.keys(
                'hcl',
                'iyr',
                'eyr',
                'ecl',
                'pid',
                'byr',
                'hgt',
            );
        });

        it('fourth passport should have 6 fields', () => {
            const pp = batch.passports[3];
            pp.items.should.have.all.keys(
                'hcl',
                'eyr',
                'pid',
                'iyr',
                'ecl',
                'hgt',
            );
        });
    });

    describe('Extra validation batch tests', () => {
        before(() => {
            invalidPPs = 'eyr:1972 cid:100\n'
                       + 'hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926\n\n'
            
                       + 'iyr:2019\n'
                       + 'hcl:#602927 eyr:1967 hgt:170cm\n'
                       + 'ecl:grn pid:012533040 byr:1946\n\n'
            
                       + 'hcl:dab227 iyr:2012\n'
                       + 'ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277\n\n'
            
                       + 'hgt:59cm ecl:zzz\n'
                       + 'eyr:2038 hcl:74454a iyr:2023\n'
                       + 'pid:3556412378 byr:2007\n';
            
            validPPs = 'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\n'
                     + 'hcl:#623a2f\n\n'
            
                     + 'eyr:2029 ecl:blu cid:129 byr:1989\n'
                     + 'iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm\n\n'
            
                     + 'hcl:#888785\n'
                     + 'hgt:164cm byr:2001 iyr:2015 cid:88\n'
                     + 'pid:545766238 ecl:hzl\n'
                     + 'eyr:2022\n\n'
            
                     + 'iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719\n';
            invalidBatch = new Batch(invalidPPs, true);
            validBatch = new Batch(validPPs, true);
        });

        it('invalidBatch should have 0 valid passports', () => {
            invalidBatch.countValid().should.eql(0);
        });

        it('validBatch should have 4 valid passports', () => {
            validBatch.countValid().should.eql(4);
        });
    });

    describe('Extra validation passport tests', () => {
        describe('byr tests', () => {
            it('byr:2002 should be valid', () => {
                const pp = new Passport('byr:2002');
                pp.isbyrValid().should.be.true;
            });
    
            it('byr:2003 should be invalid', () => {
                const pp = new Passport('byr:2003');
                pp.isbyrValid().should.be.false;
            });
        });

        describe('hgt tests', () => {
            it('hgt:60in should be valid', () => {
                const pp = new Passport('hgt:60in');
                pp.ishgtValid().should.be.true;
            });

            it('hgt:190cm should be valid', () => {
                const pp = new Passport('hgt:190cm');
                pp.ishgtValid().should.be.true;
            });

            it('hgt:190in should be invalid', () => {
                const pp = new Passport('hgt:190in');
                pp.ishgtValid().should.be.false;
            });

            it('hgt:190 should be invalid', () => {
                const pp = new Passport('hgt:190');
                pp.ishgtValid().should.be.false;
            });
        });

        describe('hcl tests', () => {
            it('hcl:#123abc should be valid', () => {
                const pp = new Passport('hcl:#123abc');
                pp.ishclValid().should.be.true;
            });

            it('hcl:#123abz should be invalid', () => {
                const pp = new Passport('hcl:#123abz');
                pp.ishclValid().should.be.false;
            });

            it('hcl:123abc should be invalid', () => {
                const pp = new Passport('hcl:123abc');
                pp.ishclValid().should.be.false;
            });
        });

        describe('ecl tests', () => {
            it('ecl:brn should be valid', () => {
                const pp = new Passport('ecl:brn');
                pp.iseclValid().should.be.true;
            });

            it('ecl:wat should be invalid', () => {
                const pp = new Passport('ecl:wat');
                pp.iseclValid().should.be.false;
            });
        });

        describe('pid tests', () => {
            it('pid:000000001 should be valid', () => {
                const pp = new Passport('pid:000000001');
                pp.ispidValid().should.be.true;
            });

            it('pid:0123456789 should be invalid', () => {
                const pp = new Passport('pid:0123456789');
                pp.ispidValid().should.be.false;
            });
        });
    });
});