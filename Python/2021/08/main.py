class Display:
    def __init__(self, line) -> None:
        self.segments = {}
        self.unique_signal, self.output = [part.split(' ') for part in line.split(' | ')]
        self.unique_signal = [''.join(sorted(sig)) for sig in self.unique_signal]
        self.output = [''.join(sorted(sig)) for sig in self.output]
        self._map_segs()

    def _get_simple_digits(self, digits: list) -> list:
        return [
            digit for digit in digits
            if len(digit) == 2
            or len(digit) == 3
            or len(digit) == 4
            or len(digit) == 7
        ]

    def _map_simple_digits(self, digits: list) -> dict:
        digit_map = {}
        for digit in set(digits):
            seg_count = len(digit)
            if seg_count == 2:
                digit_map[1] = digit
            elif seg_count == 3:
                digit_map[7] = digit
            elif seg_count == 4:
                digit_map[4] = digit
            elif seg_count == 7:
                digit_map[8] = digit
        return digit_map

    def _map_segs(self) -> None:
        simple_digits = self._get_simple_digits(self.unique_signal)
        simple_digit_map = self._map_simple_digits(simple_digits)
        keys = simple_digit_map.keys()
        if 7 in keys and 1 in keys:
            for seg in simple_digit_map[7]:
                if seg not in simple_digit_map[1]:
                    self.segments['a'] = seg
                    break

        for seg in 'abcdefg':
            samples = set(self.unique_signal)
            count = sum([1 for sample in samples if seg in sample])
            if count == 6:
                self.segments['b'] = seg
            elif count == 8 and seg != self.segments['a']:
                self.segments['c'] = seg
            elif count == 7:
                if seg in simple_digit_map[4]:
                    self.segments['d'] = seg
                else:
                    self.segments['g'] = seg
            elif count == 4:
                self.segments['e'] = seg
            elif count == 9:
                self.segments['f'] = seg
            


    def count_simple_digits(self) -> int:
        return sum([1 for _ in self._get_simple_digits(self.output)])
    
    def _decode_digit(self, digit):
        digit_len = len(digit)
        b = self.segments['b']
        d = self.segments['d']
        c = self.segments['c']
        e = self.segments['e']
        f = self.segments['f']
        if digit_len == 2:
            return '1'
        elif digit_len == 3:
            return '7'
        elif digit_len == 4:
            return '4'
        elif digit_len == 5:
            # 2 3 5
            if b not in digit and f not in digit:
                return '2'
            elif b not in digit and e not in digit:
                return '3'
            elif c not in digit and e not in digit:
                return '5'
        elif digit_len == 6:
            # 0 6 9
            if d not in digit:
                return '0'
            elif c not in digit:
                return '6'
            elif e not in digit:
                return '9'
        elif digit_len == 7:
            return '8'

    def decode_output(self):
        return int(
            ''.join(
                [self._decode_digit(digit) for digit in self.output]
            )
        )
        


def test():
    lines = [
        'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
        'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
        'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
        'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
        'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
        'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
        'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
        'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
        'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
        'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce',
    ]
    disps = [Display(line) for line in lines]
    assert sum([disp.count_simple_digits() for disp in disps]) == 26
    assert sum([disp.decode_output() for disp in disps]) == 61229

def main():
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    lines = [line.replace('\n', '') for line in lines if len(line) > 0]
    displays = [Display(line) for line in lines]
    print(f'1, 4, 7, and/or 8 appear {sum([disp.count_simple_digits() for disp in displays])} times')
    # part 1: 530
    total = sum([disp.decode_output() for disp in displays])
    print(f'Total ouput value: {total}')


if __name__ == '__main__':
    test()
    main()