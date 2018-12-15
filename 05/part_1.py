import string

# aA, bB .. zZ
lu = [
    string.ascii_lowercase[i] + string.ascii_uppercase[i]
    for i in range(0, len(string.ascii_lowercase))
]

# Aa, Bb .. Zz
ul = [
    string.ascii_uppercase[i] + string.ascii_lowercase[i] 
    for i in range(0, len(string.ascii_lowercase))
]

polymers = lu + ul

line = ''

with open('input.txt', 'r') as f:
    line = f.readline().strip('\n')

def cancel_polymers(line):
    for bad_pair in polymers:
        line = line.replace(bad_pair, '')
    return line

def its_go_time(line):
    while True:
        size = len(line)
        tmp = cancel_polymers(line)
        if tmp == line:
            return size
        line = tmp

assert its_go_time('aA') == 0
assert its_go_time('abBA') == 0
assert its_go_time('abAB') == 4
assert its_go_time('aabAAB') == 6
assert its_go_time('dabAcCaCBAcCcaDA') == 10

print(its_go_time(line))
# 9288