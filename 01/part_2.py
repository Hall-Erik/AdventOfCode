lines = []

with open('input.txt', 'r') as f:
    lines = f.readlines()

def get_seen_twice(ids: list) -> int:
    freq = 0
    seen = {0: True}
    first_seen_twice = None
    iteration = 1
    while first_seen_twice == None:
        for line in ids:
            freq += int(line)
            if seen.get(freq, False):
                first_seen_twice = freq
                break
            else:
                seen[freq] = True
        iteration += 1
    return first_seen_twice

assert get_seen_twice(['+1', '-1']) == 0
assert get_seen_twice(['+3', '+3', '+4', '-2', '-4']) == 10
assert get_seen_twice(['-6', '+3', '+8', '+5', '-6']) == 5
assert get_seen_twice(['+7', '+7', '-2', '-7', '-4']) == 14

print('First seen twice: {}'.format(get_seen_twice(lines)))