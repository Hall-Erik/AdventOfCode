class ThermalMap:
    def __init__(self, lines:list) -> None:
        lines = self._clean(lines)
        self.instructions = self._get_instructions(lines)
        points = self._get_points(lines)
        self.tm = {
            (int(point[0]), int(point[1])): '#'
            for point in points
        }
        print(self)
        for instruction in self.instructions:
            self._fold(instruction)
            print(self)
    
    def _fold(self, instruction:str) -> None:
        axis, loc = instruction.split('=')
        loc = int(loc)
        if axis == 'x':
            self._fold_x(loc)
        else:
            self._fold_y(loc)

    def _fold_x(self, loc:int) -> None:
        to_delete = []
        to_add = []
        for point in self.tm.keys():
            if point[0] > loc:
                dist = point[0] - loc
                x = point[0] - (2 * dist)
                to_delete.append((point[0], point[1]))
                to_add.append((x, point[1]))
        for point in to_delete:
            del self.tm[point]
        for point in to_add:
            self.tm[point] = '#'
        print('fold x', loc)
    
    def _fold_y(self, loc:int) -> None:
        to_delete = []
        to_add = []
        for point in self.tm.keys():
            if point[1] > loc:
                dist = point[1] - loc
                y = point[1] - (2 * dist)
                to_delete.append((point[0], point[1]))
                to_add.append((point[0], y))
        for point in to_delete:
            del self.tm[point]
        for point in to_add:
            self.tm[point] = '#'
        print('fold y', loc)

    def _clean(self, lines:list) -> list:
        return [line.replace('\n', '') for line in lines if len(line) > 0]
    
    def _get_points(self, lines:list) -> list:
        return [line.split(',') for line in lines if ',' in line]
    
    def _get_instructions(self, lines:list) -> list:
        return [line.replace('fold along ', '') for line in lines if 'fold along ' in line]

    def __repr__(self) -> str:
        points = self.tm.keys()
        x = max(points, key=lambda x: x[0])[0] + 1
        y = max(points, key=lambda y: y[1])[1] + 1
        ret = ''
        for row in range(y):
            for col in range(x):
                if (col, row) in self.tm:
                    ret += '#'
                else:
                    ret += '.'
            ret += '\n'
        ret += f'{len(self.tm.keys())} visible points\n'
        return ret

def test():
    lines = [
        '6,10',
        '0,14',
        '9,10',
        '0,3',
        '10,4',
        '4,11',
        '6,0',
        '6,12',
        '4,1',
        '0,13',
        '10,12',
        '3,4',
        '3,0',
        '8,4',
        '1,10',
        '2,14',
        '8,10',
        '9,0',
        '',
        'fold along y=7',
        'fold along x=5',
    ]
    tm = ThermalMap(lines)

def main():
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    tm = ThermalMap(lines)
    # part 1: 710
    # part 2: EPLGRULR

if __name__ == '__main__':
    test()
    print('--------END TEST--------\n')
    main()
