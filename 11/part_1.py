from collections import Counter

grid_serial_number = 4455
squares = Counter()

def get_power_level(x:int, y:int, gsn:int) -> int:
    rack_id = x+10
    pl = (y*rack_id)+gsn
    pl *= rack_id
    return (int(pl/100)%10)-5

def get_square_power(x:int, y:int, gsn:int) -> int:
    power = 0
    for i in range(3):
        for j in range(3):
            power += get_power_level(x+i, y+j, gsn)
    return power

assert get_power_level(3, 5, 8) == 4
assert get_power_level(122, 79, 57) == -5
assert get_power_level(217, 196, 39) == 0
assert get_power_level(101, 153, 71) == 4

assert get_square_power(33, 45, 18) == 29
assert get_square_power(21, 61, 42) == 30

for i in range(1, 299):
    for j in range(1, 299):
        print(i, j)
        squares[(i, j)] = get_square_power(i, j, grid_serial_number)

print(squares.most_common(1))
# 21,54