from time import sleep

lines = []

with open('input.txt', 'r') as f:
    lines = f.readlines()

class Star:
    def __init__(self, x, y, dx, dy):
        self.x = x
        self.y = y
        self.dx = dx
        self.dy = dy

    def move(self, seconds: int=1):
        self.x += self.dx*seconds
        self.y += self.dy*seconds

    def __repr__(self):
        return f'({str(self.x)}, {str(self.y)})'

    @staticmethod
    def from_line(line: str) -> 'Star':
        line_list = line \
            .replace('position=<', '') \
            .replace('velocity=<', '') \
            .replace('>', '') \
            .replace(',', '') \
            .split(' ')
        for i in line_list:
            if i == '':
                line_list.remove(i)
        return Star(
            int(line_list[0]),
            int(line_list[1]),
            int(line_list[2]),
            int(line_list[3]))

def get_min_max(stars: list) -> tuple:
    min_x = min(star.x for star in stars)
    max_x = max(star.x for star in stars)
    min_y = min(star.y for star in stars)
    max_y = max(star.y for star in stars)
    return min_x, max_x, min_y, max_y

def display_stars(stars: list) -> str:
    positions = {}
    for star in stars:
        positions[(star.x, star.y)] = 1
    min_x, max_x, min_y, max_y = get_min_max(stars)
    grid = [['#' if (x, y) in positions else '.'
        for x in range(min_x, max_x+1)]
        for y in range(min_y, max_y+1)]
    return '\n'.join("".join(row) for row in grid)        

test_data = '''position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>'''

# stars = [Star.from_line(line) for line in test_data.split('\n')]
stars = [Star.from_line(line) for line in lines]

min_x, max_x, min_y, max_y = get_min_max(stars)
seconds = 0

# Let them move until they are reasionably close.
while max_x-min_x > 101:
    for star in stars:
        star.move()
    seconds += 1
    min_x, max_x, min_y, max_y = get_min_max(stars)

# Now, display them
for i in range(5):
    print()
    print(f'{i + seconds} seconds')
    print(display_stars(stars))
    for star in stars:
        star.move()

# part 1: PPNJEENH
# part 2: 10375