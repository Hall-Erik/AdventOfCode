from collections import Counter
lines = []

with open('input.txt', 'r') as f:
    lines = f.readlines()

def parse(claim: str) -> tuple:
    c, x, y, w, h = claim \
        .replace('#', '') \
        .replace('@ ', '') \
        .replace(':', '') \
        .replace(',', ' ') \
        .replace('x', ' ') \
        .split(' ')
    return int(c), int(x), int(y), int(w), int(h)

def get_coords(x: int, y: int, w: int, h: int) -> list:
    coords = []
    for width in range(w):        
        for height in range(h):        
            coords.append((x+1+width, y+1+height))

    return coords

def measure_claims(claims: list) -> int:
    count = Counter()
    claim_dict = {}
    for claim in claims:
        c, x, y, w, h = parse(claim)
        coords = get_coords(x, y, w, h)
        claim_dict[c] = coords
        for coord in coords:
            count[coord] += 1
    for claim in claim_dict:
        intact_claim = True
        for coord in claim_dict[claim]:
            if count[coord] > 1:
                intact_claim = False
                break
        if intact_claim:
            return claim
    return -1

assert parse('#3 @ 5,5: 2x2') == (3, 5, 5, 2, 2)
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
]) == 3

print(measure_claims(lines))