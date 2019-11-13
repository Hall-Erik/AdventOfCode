from collections import Counter
lines = []

with open('input.txt', 'r') as f:
    lines = f.readlines()

def parse(claim: str) -> tuple:
    _, x, y, w, h = claim \
        .replace('#', '') \
        .replace('@ ', '') \
        .replace(':', '') \
        .replace(',', ' ') \
        .replace('x', ' ') \
        .split(' ')
    return int(x), int(y), int(w), int(h)

def get_coords(x: int, y: int, w: int, h: int) -> list:
    coords = []
    for width in range(w):        
        for height in range(h):        
            coords.append((x+1+width, y+1+height))

    return coords

def measure_claims(claims: list) -> int:
    c = Counter()
    for claim in claims:
        x, y, w, h = parse(claim)
        coords = get_coords(x, y, w, h)
        for coord in coords:
            c[coord] += 1
    return len([x for x in c if c[x] >= 2])

assert parse('#3 @ 5,5: 2x2') == (5, 5, 2, 2)
assert get_coords(5, 5, 2, 2) == [
    (6,6),
    (6,7),
    (7,6),
    (7,7)
]
assert measure_claims([
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2'
]) == 4

print(measure_claims(lines))