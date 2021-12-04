from collections import Counter

class Power:
    def __init__(self, lines):
        self.lines = lines
        self.counters = [Counter() for i in range(len(lines[0]))]
        for line in lines:
            for i, bit in enumerate(line):
                self.counters[i][bit] += 1
        self.gamma_rate = ''.join([self.counters[i].most_common()[0][0] for i in range(len(self.counters))])
        self.epsilon_rate = ''.join([self.counters[i].most_common()[1][0] for i in range(len(self.counters))])

    def consumption(self):
        return int(self.gamma_rate, 2) * int(self.epsilon_rate, 2)

    def _filter_lines(self, lines:list, pos:int, value:int):
        return [line for line in lines if line[pos] == value]

    def _get_rating(self, comparator):
        lines = self.lines
        for i in range(len(self.lines[0])):
            counter = Counter([line[i] for line in lines])
            if len(lines) == 1:
                break
            one = counter['1']
            zero = counter['0']
            val = comparator(one, zero)
            lines = self._filter_lines(lines, i, val)
        return int(lines[0], 2)

    def oxygen_gen_rating(self):
        comparator = lambda one, zero: '1' if one >= zero else '0'
        return self._get_rating(comparator)
    
    def co2_scrubber_rating(self):
        comparator = lambda one, zero: '0' if zero <= one else '1'
        return self._get_rating(comparator)
    
    def life_support_rating(self):
        return self.oxygen_gen_rating() * self.co2_scrubber_rating()

def clean(lines):
    lines = [line.replace('\n', '') for line in lines]
    return [line for line in lines if len(line) > 0]

def test():
    lines = [
        '00100',
        '11110',
        '10110',
        '10111',
        '10101',
        '01111',
        '00111',
        '11100',
        '10000',
        '11001',
        '00010',
        '01010',
    ]
    power = Power(lines)
    assert power.gamma_rate == '10110'
    assert power.epsilon_rate == '01001'
    assert power.consumption() == 198
    assert power.oxygen_gen_rating() == 23
    assert power.co2_scrubber_rating() == 10
    assert power.life_support_rating() == 230

def main():
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    lines = clean(lines)

    # part 1
    power = Power(lines)
    print(f'Power consumption: {power.consumption()}')

    # part 2
    print(f'Life support rating: {power.life_support_rating()}')

if __name__ == '__main__':
    test()
    main()
