from itertools import product

grid_serial_number = 4455
levels = {} # {(1,1): -4}
switch_levels = {} #{(1,1,1): -4}

def get_power_level(x:int, y:int, gsn:int) -> int:
    rack_id = x+10
    pl = (y*rack_id)+gsn
    pl *= rack_id
    return (int(pl/100)%10)-5

def read_levels(gsn:int, size:int=300) -> dict:
    levels = {}
    for y in range(size):
        for x in range(size):
            levels[(x+1, y+1)] = get_power_level(x+1,y+1, gsn)
    return levels

def get_switch_levels(levels:dict, size:int=300) -> dict:
    switch_levels = {}

    for y in range(size):
        for x in range(size):
            for s in range(size-max(x, y)):
                grids = product(range(x+1, x+s+2), range(y+1, y+2+s))
                total = sum([levels[g] for g in grids])
                switch_levels[(x+1, y+1, s+1)] = total

    return switch_levels

levels = read_levels(grid_serial_number)
switch_levels = get_switch_levels(levels)
print(max(switch_levels, key= lambda x: switch_levels[x]))
# 236, 268, 11