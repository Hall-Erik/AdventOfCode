from collections import Counter

class Crab:
    def __init__(self, crabs) -> None:
        self.crab = Counter([int(c) for c in crabs.replace('\n', '').split(',')])

    def burn_fuel(self, pos: int, crab_engineering: bool):
        total = 0
        for k, v in self.crab.items():
            moves = abs(pos - k)
            if crab_engineering:
                moves += sum([i for i in range(moves)])    
            total += v * moves
        return total

    def get_min(self, crab_engineering: bool = False):
        start = min(self.crab.keys())
        stop = max(self.crab.keys())
        costs = [self.burn_fuel(i, crab_engineering) for i in range(start, stop + 1)]
        return min(costs)

def test():
    crabs = '16,1,2,0,4,2,7,1,2,14'
    crab = Crab(crabs)
    assert crab.get_min() == 37
    assert crab.get_min(crab_engineering=True) == 168

def main():
    with open('input.txt', 'r') as f:
        line = f.readline()
    crab = Crab(line)
    print(f'Least fuel used: {crab.get_min()}') # part 1: 336120
    print(f'Least fuel used according to crab engineering: {crab.get_min(True)}') # part 2: 96864235

if __name__ == '__main__':
    test()
    main()
