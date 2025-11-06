class Octopus:
    def __init__(self, energy_level, i, j) -> None:
        self.flashed = False
        self.energy_level = int(energy_level)
        self.i = i
        self.j = j

    def set_neighbors(self, neighbors) -> None:
        self.neighbors = neighbors

    def increase(self) -> None:
        if not self.flashed:
            self.energy_level += 1

    def flash(self) -> None:
        if self.energy_level > 9:
            self.flashed = True
            self.energy_level = 0
            for n in self.neighbors:
                n.increase()
                n.flash()
    
    def has_flashed(self) -> bool:
        ret = self.flashed
        self.flashed = False
        return ret


class OctoMap:
    def __init__(self, hm) -> None:
        self.flashes = 0
        self.octopi = {}
        self.hm = hm
        for i, _ in enumerate(hm):
            for j, col in enumerate(hm[i]):
                self.octopi[(i,j)] = Octopus(col, i, j)
        for octopus in self.octopi.values():
            octopus.set_neighbors(self._get_neighbors(octopus))

    def _get_neighbors(self, octopus: Octopus) -> None:
        i = octopus.i
        j = octopus.j
        neighbors = []
        if i > 0:
            if j > 0:
                neighbors.append(self.octopi[(i-1, j-1)])
            neighbors.append(self.octopi[(i-1, j)])
            if j < len(self.hm) - 1:
                neighbors.append(self.octopi[(i-1, j+1)])
        if j > 0:
            neighbors.append(self.octopi[(i, j-1)])
        if j < len(self.hm[0]) - 1:
            neighbors.append(self.octopi[(i, j+1)])
        if i < len(self.hm) - 1:
            if j > 0:
                neighbors.append(self.octopi[(i+1, j-1)])
            neighbors.append(self.octopi[(i+1, j)])
            if j < len(self.hm) - 1:
                neighbors.append(self.octopi[(i+1, j+1)])
        return neighbors
    
    def step(self):
        for o in self.octopi.values():
            o.increase()
        for o in self.octopi.values():
            o.flash()
        count_flashes = sum([1 for o in self.octopi.values() if o.has_flashed()])
        self.flashes += count_flashes
        return count_flashes == len(self.octopi.keys())
    
    def __str__(self) -> str:
        out = []
        for i in range(len(self.hm)):
            out.append(''.join([str(self.octopi[(i, j)].energy_level) for j in range(len(self.hm[0]))]))
        return '\n'.join(out)


def test():
    lines = [
        '5483143223',
        '2745854711',
        '5264556173',
        '6141336146',
        '6357385478',
        '4167524645',
        '2176841721',
        '6882881134',
        '4846848554',
        '5283751526',
    ]
    om = OctoMap(lines)
    for _ in range(10):
        om.step()
    assert om.flashes == 204
    for _ in range(90):
        om.step()
    assert om.flashes == 1656
    for i in range(95):
        n = 100 + i + 1
        assert om.step() == (n == 195)


def main():
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    lines = [line.replace('\n', '') for line in lines if len(line) > 0]
    om = OctoMap(lines)
    for _ in range(100):
        om.step()
    print(f'{om.flashes} flashes after 100 steps')
    om  = OctoMap(lines)
    i = 1
    while True:
        all_flashed = om.step()
        if all_flashed:
            print(f'All octopi flashed at step {i}')
            break
        i += 1



if __name__ == '__main__':
    test()
    main()
