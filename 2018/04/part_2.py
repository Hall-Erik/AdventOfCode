from collections import Counter

lines = []
guard_schedule = {}
guard_sleep_counter = Counter()

with open('input.txt', 'r') as f:
    lines = f.readlines()

def parse(entry: str) -> tuple:
    minute = int(entry[15:17])
    hour = int(entry[12:14])
    if hour == 23:
        minute = 0
    guard = None
    action = entry[19:24]
    if action == 'Guard':
        guard = entry.split(' ')[3].replace('#', '')

    return minute, action, guard    

def count_nap(guard: str, beg: int, end: int):
    if guard not in guard_schedule:
        guard_schedule[guard] = Counter()
    for i in range(beg, end):
        guard_schedule[guard][i] += 1
    guard_sleep_counter[guard] += end - beg

def count_naps(log: list):
    asleep = None
    guard = None
    for entry in log:
        minute, action, g = parse(entry)
        if action == 'Guard':
            guard = g
        if action == 'falls':
            asleep = minute
        if action == 'wakes':
            count_nap(guard, asleep, minute)
            asleep = None

assert parse(lines[0]) == (0, 'Guard', '1231')
assert parse(lines[1]) == (0, 'falls', None)
assert parse(lines[3]) == (58, 'wakes', None)

lines.sort(key=lambda x: x[0:17])
count_naps(lines)

msm = 0
count = 0
guard = None
for g in guard_schedule:
    m = guard_schedule[g].most_common()[0][0]
    c = guard_schedule[g].most_common()[0][1]
    if c > count:
        msm = m
        count = c
        guard = g

print(f'Guard: {guard}')
print(f'Minute: {msm}')
print(f'Product: {msm*int(guard)}')

# Guard #1901 and minute 51, totaling 96951