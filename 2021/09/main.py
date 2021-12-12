class Point:
    def __init__(self, height, i, j) -> None:
        self.height = int(height)
        self.i = i
        self.j = j

    def set_neighbors(self, neighbors):
        self.neighbors: list[Point] = neighbors

    def is_low_point(self):
        return all([n.height > self.height for n in self.neighbors])

    def risk_level(self):
        return self.height + 1

    def __repr__(self) -> str:
        return f'<Point({self.i}, {self.j})>'


class Basin:
    def __init__(self, points) -> None:
        self.points = points
    
    def size(self):
        return len(self.points)

    def __repr__(self) -> str:
        return f'<Basin({self.size()})>'


class HeightMap:
    def __init__(self, hm) -> None:
        self.hm = hm
        self.points = {}
        for i, row in enumerate(hm):
            for j, col in enumerate(row):
                self.points[(i,j)] = Point(col, i, j)
        for p in self.points.values():
            neighbors = self._get_neighbors(p.i, p.j)
            p.set_neighbors(neighbors)

        self.low_points = [p for p in self.points.values() if p.is_low_point()]
        self._get_basins()
    
    def _get_neighbors(self, i, j):
        neighbors = []
        if i > 0:
            neighbors.append(self.points[(i-1, j)])
        if i < len(self.hm) - 1:
            neighbors.append(self.points[(i+1, j)])
        if j > 0:
            neighbors.append(self.points[(i, j-1)])
        if j < len(self.hm[0]) - 1:
            neighbors.append(self.points[(i, j+1)])
        return neighbors

    def _get_all_the_neighbors(self, points):
        neighbors = points
        while True:
            l = len(points)
            for p in points:
                n = self._get_neighbors(p.i, p.j)
                n = [t for t in n if t not in neighbors and t.height != 9]
                neighbors.extend(n)
            tl = len(points)
            if l == tl:
                break
            l = tl
        return neighbors

    def _get_basins(self):
        self.basins = [Basin(self._get_all_the_neighbors([p])) for p in self.low_points]
    
    def _top_3_basins(self):
        return sorted(self.basins, key=lambda b:  b.size(), reverse=True)[:3]

    def largest_basins_size(self):
        p = 1
        for b in self._top_3_basins():
            p *= b.size()
        return p

    def risk_level(self):
        return sum([p.risk_level() for p in self.low_points])

def test():
    lines = [
        '2199943210',
        '3987894921',
        '9856789892',
        '8767896789',
        '9899965678',
    ]
    hm = HeightMap(lines)
    assert hm.risk_level() == 15
    assert hm.largest_basins_size() == 1134


def main():
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    lines = [line.replace('\n', '') for line in lines if len(line) > 0]
    hm = HeightMap(lines)
    print(f'Risk level: {hm.risk_level()}') # 564
    print(f'Size of largest basins: {hm.largest_basins_size()}') # 1038240


if __name__ == '__main__':
    test()
    main()
