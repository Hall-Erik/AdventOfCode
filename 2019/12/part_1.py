from itertools import combinations

class Moon:
    def __init__(self, position:str):
        position = position.replace('\n', '')\
                           .replace(' ', '')\
                           .replace('<', '')\
                           .replace('>', '')\
                           .replace('=', '')\
                           .replace('x', '')\
                           .replace('y', '')\
                           .replace('z', '')\
                           .split(',')
        self.x = int(position[0])
        self.y = int(position[1])
        self.z = int(position[2])
        self.dx = self.dy = self.dz = 0
    
    def move(self):
        self.x += self.dx
        self.y += self.dy
        self.z += self.dz

    def get_position(self) -> tuple:
        return (self.x, self.y, self.z)

    def get_velocity(self) -> tuple:
        return (self.dx, self.dy, self.dz)

    def get_potential_energy(self) -> int:
        return abs(self.x) + abs(self.y) + abs(self.z)

    def get_kinetic_energy(self) -> int:
        return abs(self.dx) + abs(self.dy) + abs(self.dz)

    def get_total_energy(self) -> int:
        return self.get_potential_energy() * self.get_kinetic_energy()

    def __str__(self):
        pos = f'pos=<x= {self.x}, y= {self.y}, z= {self.z}>'
        vel = f'vel=<x= {self.dx}, y= {self.dy}, z= {self.dz}>'
        return  pos + ', ' + vel

def compare(x:int, y:int) -> int:
    if x > y: return 1
    elif x < y: return -1
    else: return 0

def change_velocities(m1:Moon, m2:Moon):
    '''Update velocities for a pair of moons'''
    x_diff = compare(m1.x, m2.x)
    m1.dx -= x_diff
    m2.dx += x_diff
    y_diff = compare(m1.y, m2.y)
    m1.dy -= y_diff
    m2.dy += y_diff
    z_diff = compare(m1.z, m2.z)
    m1.dz -= z_diff
    m2.dz += z_diff

def time_step(moons:list):
    moon_pairs = combinations(moons, 2)
    for pair in moon_pairs:
        change_velocities(pair[0], pair[1])
    for moon in moons:
        moon.move()

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        input_moons = f.readlines()
    moons = [Moon(m) for m in input_moons]
    for _ in range(1000):
        time_step(moons)
    print(f'Total energy after 1000 time units: {sum([moon.get_total_energy() for moon in moons])}')

    # Tests
    test_moons = [
        '<x=-1, y=0, z=2>',
        '<x=2, y=-10, z=-7>',
        '<x=4, y=-8, z=8>',
        '<x=3, y=5, z=-1>'
    ]
    moons = [Moon(m) for m in test_moons]
    
    # After 0 steps:
    assert (moons[0].dx, moons[0].dy, moons[0].dz) == (0, 0, 0)
    assert (moons[1].dx, moons[1].dy, moons[1].dz) == (0, 0, 0)
    assert (moons[2].dx, moons[2].dy, moons[2].dz) == (0, 0, 0)
    assert (moons[3].dx, moons[3].dy, moons[3].dz) == (0, 0, 0)
    assert (moons[0].x, moons[0].y, moons[0].z) == (-1, 0, 2)
    assert (moons[1].x, moons[1].y, moons[1].z) == (2, -10, -7)
    assert (moons[2].x, moons[2].y, moons[2].z) == (4, -8, 8)
    assert (moons[3].x, moons[3].y, moons[3].z) == (3, 5, -1)

    # After 1 steps:
    time_step(moons)
    assert (moons[0].dx, moons[0].dy, moons[0].dz) == (3, -1, -1)
    assert (moons[1].dx, moons[1].dy, moons[1].dz) == (1, 3, 3)
    assert (moons[2].dx, moons[2].dy, moons[2].dz) == (-3, 1, -3)
    assert (moons[3].dx, moons[3].dy, moons[3].dz) == (-1, -3, 1)
    assert (moons[0].x, moons[0].y, moons[0].z) == (2, -1, 1)
    assert (moons[1].x, moons[1].y, moons[1].z) == (3, -7, -4)
    assert (moons[2].x, moons[2].y, moons[2].z) == (1, -7, 5)
    assert (moons[3].x, moons[3].y, moons[3].z) == (2, 2, 0)

    # After 2 steps:
    time_step(moons)
    assert (moons[0].dx, moons[0].dy, moons[0].dz) == (3, -2, -2)
    assert (moons[1].dx, moons[1].dy, moons[1].dz) == (-2, 5, 6)
    assert (moons[2].dx, moons[2].dy, moons[2].dz) == (0, 3, -6)
    assert (moons[3].dx, moons[3].dy, moons[3].dz) == (-1, -6, 2)
    assert (moons[0].x, moons[0].y, moons[0].z) == (5, -3, -1)
    assert (moons[1].x, moons[1].y, moons[1].z) == (1, -2, 2)
    assert (moons[2].x, moons[2].y, moons[2].z) == (1, -4, -1)
    assert (moons[3].x, moons[3].y, moons[3].z) == (1, -4, 2)

    # After 5 setps:
    time_step(moons)
    time_step(moons)
    time_step(moons)
    assert (moons[0].dx, moons[0].dy, moons[0].dz) == (-3, -1, 2)
    assert (moons[1].dx, moons[1].dy, moons[1].dz) == (2, 0, -2)
    assert (moons[2].dx, moons[2].dy, moons[2].dz) == (0, -1, 2)
    assert (moons[3].dx, moons[3].dy, moons[3].dz) == (1, 2, -2)
    assert (moons[0].x, moons[0].y, moons[0].z) == (-1, -9, 2)
    assert (moons[1].x, moons[1].y, moons[1].z) == (4, 1, 5)
    assert (moons[2].x, moons[2].y, moons[2].z) == (2, 2, -4)
    assert (moons[3].x, moons[3].y, moons[3].z) == (3, -7, -1)

    # After 10 setps:
    time_step(moons)
    time_step(moons)
    time_step(moons)
    time_step(moons)
    time_step(moons)
    assert (moons[0].dx, moons[0].dy, moons[0].dz) == (-3, -2, 1)
    assert (moons[1].dx, moons[1].dy, moons[1].dz) == (-1, 1, 3)
    assert (moons[2].dx, moons[2].dy, moons[2].dz) == (3, 2, -3)
    assert (moons[3].dx, moons[3].dy, moons[3].dz) == (1, -1, -1)
    assert (moons[0].x, moons[0].y, moons[0].z) == (2, 1, -3)
    assert (moons[1].x, moons[1].y, moons[1].z) == (1, -8, 0)
    assert (moons[2].x, moons[2].y, moons[2].z) == (3, -6, 1)
    assert (moons[3].x, moons[3].y, moons[3].z) == (2, 0, 4)
    assert sum([moon.get_total_energy() for moon in moons]) == 179
    
    # Second test set:
    test_moons = [
        '<x=-8, y=-10, z=0>',
        '<x=5, y=5, z=10>',
        '<x=2, y=-7, z=3>',
        '<x=9, y=-8, z=-3>'
    ]

    moons = [Moon(m) for m in test_moons]
    for _ in range(100):
        time_step(moons)
    assert (moons[0].dx, moons[0].dy, moons[0].dz) == (-7, 3, 0)
    assert (moons[1].dx, moons[1].dy, moons[1].dz) == (3, -11, -5)
    assert (moons[2].dx, moons[2].dy, moons[2].dz) == (-3, 7, 4)
    assert (moons[3].dx, moons[3].dy, moons[3].dz) == (7, 1, 1)
    assert (moons[0].x, moons[0].y, moons[0].z) == (8, -12, -9)
    assert (moons[1].x, moons[1].y, moons[1].z) == (13, 16, -3)
    assert (moons[2].x, moons[2].y, moons[2].z) == (-29, -11, -1)
    assert (moons[3].x, moons[3].y, moons[3].z) == (16, -13, 23)
    assert sum([moon.get_total_energy() for moon in moons]) == 1940