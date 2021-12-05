from collections import Counter
from fractions import Fraction

class Line:
    def __init__(self, line):
        a, b = line.split(' -> ')
        self.ax, self.ay = a.split(',')
        self.bx, self.by = b.split(',')
        self.ax = int(self.ax)
        self.ay = int(self.ay)
        self.bx = int(self.bx)
        self.by = int(self.by)

    def points(self):
        points = []
        
        if self.ax == self.bx:
            if self.ay > self.by:
                points = [(self.bx, i) for i in range(self.by, self.ay + 1)]
            else:
                points = [(self.ax, i) for i in range(self.ay, self.by + 1)]

        elif self.ay == self.by:
            if self.ax > self.bx:
                points = [(i, self.by) for i in range(self.bx, self.ax + 1)]
            else:
                points = [(i, self.ay) for i in range(self.ax, self.bx + 1)]

        else:
            slope = Fraction(self.by - self.ay, self.bx - self.ax)
            rise = slope.numerator
            run = slope.denominator
            
            if self.ay > self.by:
                rise = abs(rise) * -1
            else:
                rise = abs(rise)
            
            if self.ax > self.bx:
                run = abs(run) * -1
            else:
                run = abs(run)

            x, y = self.ax, self.ay
            points = [(x, y)]
            while not (x == self.bx and y == self.by):
                x += run
                y += rise
                points.append((x, y))

        return points

    def is_diagonal(self):
        return not any([
            self.ax == self.bx,
            self.ay == self.by,
        ])


class VentMap:
    def __init__(self, lines, handle_diagonals=False):
        self.pointCounter = Counter()
        self.lines = [Line(line) for line in lines]
        if not handle_diagonals:
            self.lines = [line for line in self.lines if not line.is_diagonal()]
        for line in self.lines:
            for point in line.points():
                self.pointCounter[point] += 1
    
    def overlaps(self):
        return sum([1 for k, v in self.pointCounter.items() if v >= 2])


def clean(lines):
    lines = [line.replace('\n', '') for line in lines]
    return [line for line in lines if len(line) > 0]

def test():
    lines = [
        '8,0 -> 0,8',
        '0,9 -> 5,9',
        '9,4 -> 3,4',
        '2,2 -> 2,1',
        '7,0 -> 7,4',
        '6,4 -> 2,0',
        '0,9 -> 2,9',
        '3,4 -> 1,4',
        '0,0 -> 8,8',
        '5,5 -> 8,2',
    ]
    vent_map = VentMap(lines)
    assert vent_map.overlaps() == 5
    vent_map = VentMap(lines, True)
    assert vent_map.overlaps() == 12

def main():
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    lines = clean(lines)
    vent_map = VentMap(lines)
    print(f'Overlapping vents: {vent_map.overlaps()}') # part 1: 7473
    vent_map = VentMap(lines, True)
    print(f'Overlapping vents, including diagonals: {vent_map.overlaps()}') # part 1: 7473

if __name__ == '__main__':
    test()
    main()
