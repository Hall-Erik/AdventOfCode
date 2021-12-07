from dataclasses import dataclass

@dataclass
class LanternFish:
    qty: int = 0

    def add(self, amount):
        self.qty += amount

class MarchOfTime:
    def __init__(self, initial) -> None:
        self.fish = {i: LanternFish() for i in range(9)}
        for i in initial.split(','):
            self.fish.get(int(i)).add(1)

    def _step(self):
        reset_fish = self.fish[0].qty
        temp_fish = {
            **{i-1: self.fish[i] for i in range(1,9)},
            8: LanternFish(qty=reset_fish)
        }
        temp_fish[6].add(reset_fish)
        self.fish = temp_fish

    def wait(self, days):
        for _ in range(days):
            self._step()

    def total_fish(self):
        return sum([fish.qty for fish in self.fish.values()])

def test():
    initial = '3,4,3,1,2'
    time = MarchOfTime(initial)
    time.wait(18)
    assert time.total_fish() == 26
    time.wait(80 - 18)
    assert time.total_fish() == 5934
    time.wait(256 - 80)
    assert time.total_fish() == 26984457539

def main():
    with open('input.txt', 'r') as f:
        initial = f.readline()
    initial = initial.replace('\n', '')
    time = MarchOfTime(initial)
    time.wait(80)
    print(f'After 80 days, there are {time.total_fish()} fish') # part 1: 390923
    time.wait(256 - 80)
    print(f'After 256 days, there are {time.total_fish()} fish') # part 2: 1749945484935


if __name__ == "__main__":
    test()
    main()
