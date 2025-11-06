class Unit:
    def __init__(self, x:int, y:int, elf:bool=True):
        self.hp = 200
        self.atk = 3
        self.x = x
        self.y = y
        self.elf = elf

    def get_distance(self, other:'Unit') -> int:
        '''
        Returns the Manhattan distance to the other unit.
        '''
        return abs(self.x - other.x) + abs(self.y - other.y)

    def get_nearest(self, units:list):
        others = [unit for unit in units if unit.elf != self.elf]
        others.sort() # first sort by reading order.
        # then sort by Manhattan distance.
        return sorted(others, key=lambda unit: self.get_distance(unit))

    def move(self, x:int, y:int):
        self.x = x
        self.y = y
        
    def attack(self, other:'Unit'):
        other.hp -= self.atk

    def get_symbol(self):
        return 'E' if self.elf else 'G'

    def __lt__(self, other:'Unit'):
        if self.y == other.y: return self.x < other.x
        else: return self.y < other.y

    def __repr__(self):
        unit_type = 'Elf' if self.elf else 'Goblin'
        return f'<{unit_type}: ({self.x}, {self.y}, {self.hp})>'

class Node:
    def __init__(self, x, y, parent=None):
        self.x = x
        self.y = y
        self.parent = parent
        self.g = 0
        self.h = 0
        self.f = 0
    
    def __lt__(self, other):
            if self.f == other.f:
                if self.y == other.y: return self.x < other.x
                else: return self.y < other.y
            else: return self.f < other.f

class Cave:
    def __init__(self, file:str):
        self.cave = []
        self.units = []
        with open(file, 'r') as f:
            for line in f:
                self.cave.append(list(line.strip('\n')))       
        for y, row in enumerate(self.cave): # Find the units
            for x, col in enumerate(row):
                if col == 'E':
                    self.units.append(Unit(x,y))
                elif col == 'G':
                    self.units.append(Unit(x,y,elf=False))

    def get_enemy_units(self, unit:'Unit') -> list:
        return [u for u in self.units if u.elf != unit.elf]

    def get_reachable_units(self, unit:'Unit') -> list:
        units = self.get_enemy_units(unit)

    def get_possible_moves(self, x:int, y:int, prev_spaces:list=[]) -> list:
        moves = [
            (x + move[0], y + move[1]) for move in [
                         (0, -1),
                (-1, 0),          (1, 0),
                         (0, 1),
            ]
        ]
        return [
            move for move in moves
            if move[0] >= 0 and move[1] >= 0
            and move[1] < len(self.cave) and move[0] < len(self.cave[0])
            and self.cave[move[1]][move[0]] not in ['#', 'E', 'G']
            and move not in prev_spaces
        ]

    def get_distance(self, x1:int, y1:int, x2:int, y2:int) -> int:
        return abs(x1-x2) + abs(y1-y2)

    def find_route(self, unit:'Unit', x:int, y:int):
        _open = [Node(unit.x, unit.y)]
        closed = []

        def get_f_cost(a:int, b:int) -> int:
            g = self.get_distance(a, b, unit.x, unit.y)
            h = self.get_distance(a, b, x, y)
            return g + h

        while len(_open) > 0:
            current = min(_open, key=lambda node: get_f_cost(node[0], node[1]))
            _open.remove(current)
            closed.append(current)

            if current[0] == x and current[1] == y:
                break

            for neighbor in self.get_possible_moves(current[0], current[1]):
                pass
        # G cost = dist from start
        # H cost = dist from end
        # F cost = G + H

    def move_unit(self, unit:'Unit', x:int, y:int):
        self.remove_unit(unit)
        unit.move(x, y)
        self.cave[y][x] = unit.get_symbol()

    def remove_unit(self, unit:'Unit'):
        self.cave[unit.y][unit.x] = '.'

    def __repr__(self):
        s = ''
        for line in self.cave:
            s += ''.join(line) + '\n'
        return s

def game_turn(units:list, cave:'Cave') -> None:
    units.sort() # sort in reading order
    dead_units = []
    for unit in units:
        if unit.hp > 0:
            enemies = cave.get_enemy_units(unit)
            enemies_in_range = [
                enemy for enemy in enemies
                if unit.get_distance(enemy) == 1 and enemy.hp > 0
            ]
            if len(enemies_in_range) > 0: # attack nearby enemies
                print(f'{unit} attacking {enemies_in_range[0]}')
                enemies_in_range.sort()
                unit.attack(enemies_in_range[0])
                print(enemies_in_range[0])
                if enemies_in_range[0].hp <= 0:
                    dead_units.append(enemies_in_range[0])
                    cave.remove_unit(enemies_in_range[0])
            # else if there are reachable enemies:
            elif len(enemies) > 0:
                # 'In range': moves that are adjacent to enemies
                adjacent = []
                for enemy in enemies:
                    moves = cave.get_possible_moves(
                        enemy.x, enemy.y, adjacent)
                    for move in moves:
                        adjacent.append(move)
                if unit.elf:
                    print(set(adjacent))
                # 'Reachable': at least one path there
                # 'Nearest': fewest moves to reach
                # 'Chosen': nearest, including reading order
            # move toward
            elif len(enemies) == 0: # if no enemies left, return
                break
    for unit in dead_units:
        units.remove(unit)

test1 = Cave('test1.txt')
print(test1)
units = test1.units
print(test1.get_possible_moves(units[0].x, units[0].y))
game_turn(units, test1)
# test1.move_unit(units[0], units[0].x+1, units[0].y)
# game_turn(units, test1)
# print(test1)
# print(units)
# print(units[0].get_nearest(units))