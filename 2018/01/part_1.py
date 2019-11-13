lines = []

with open('input.txt', 'r') as f:
    lines = f.readlines()

def get_frequency(changes: list) -> int:
    freq = 0
    for line in changes:
        freq += int(line)
    return freq

assert get_frequency(['+1', '+1', '+1']) == 3
assert get_frequency(['+1', '+1', '-2']) == 0
assert get_frequency(['-1', '-2', '-3']) == -6
assert get_frequency([]) == 0

print('Last frequency: {}'.format(get_frequency(lines)))