from dataclasses import dataclass

horizontal = 0
depth = 0


# part 2
@dataclass
class Controls:
    horizontal: int = 0
    depth: int = 0
    aim: int = 0

    def move(self, direction: str, magnitude: int):
        if direction == 'up':
            self.up(magnitude)
        elif direction == 'down':
            self.down(magnitude)
        elif direction == 'forward':
            self.forward(magnitude)

    def up(self, x: int):
        self.aim -= x
    
    def down(self, x: int):
        self.aim += x
    
    def forward(self, x: int):
        self.horizontal += x
        self.depth = self.depth + (self.aim * x)

    def position(self):
        return self.depth * self.horizontal

def reset():
    global horizontal
    global depth
    horizontal = 0
    depth = 0

def move(direction, magnitude):
    global horizontal
    global depth

    if direction == 'forward':
        horizontal += magnitude
    elif direction == 'down':
        depth += magnitude
    elif direction == 'up':
        depth -= magnitude

def part_1(directions):
    for direction in directions:
        move(direction[0], direction[1])
    
    return horizontal * depth

def part_2(directions: list):
    controls = Controls()
    for direction in directions:
        controls.move(*direction)
    return controls.position()

def clean(lines):
    lines = [line.replace('\n', '') for line in lines]
    return [line for line in lines if len(line) > 0]

def convert(lines):
    return [[col[0], int(col[1])] for col in [line.split(' ') for line in lines]]

def main():
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    lines = clean(lines)
    lines = convert(lines)

    # part 1
    print(part_1(lines))
    # part 2
    print(part_2(lines))


def test():
    print('testing part 1...')
    directions = [
        ['forward', 5],
        ['down', 5],
        ['forward', 8],
        ['up', 3],
        ['down', 8],
        ['forward', 2],
    ]
    assert part_1(directions) == 150
    reset()
    print('testing part 2...')
    assert part_2(directions) == 900


if __name__ == '__main__':
    test()
    main()
    # part 1 1480518
    # part 2 1282809906
