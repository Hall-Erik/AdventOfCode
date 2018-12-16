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

def cancel_polymers(line: str) -> str:
    '''
    Removes polymers that cancel out.
    e.g. aA, Aa, bB, Bb ... zZ, Zz
    Returns a shortened string
    '''
    for bad_pair in polymers:
        line = line.replace(bad_pair, '')
    return line

def its_go_time(line: str) -> int:
    '''
    Repeats cancel_polymers until there
    are none left to cancel.
    Returns final length of the string
    '''
    while True:
        size = len(line)
        tmp = cancel_polymers(line)
        if tmp == line:
            return size
        line = tmp

def remove_units(line: str) -> dict:
    '''
    Removes units from the string.
    Returns a dict with removed unitsin lower case
    as keys (a, b, c...) and the string with those
    units removed as values.
    '''
    removed_lines = {}

    for i in range(0, len(string.ascii_lowercase)):
        tmp = line.replace(string.ascii_lowercase[i], '')
        tmp = tmp.replace(string.ascii_uppercase[i], '')
        removed_lines[string.ascii_lowercase[i]] = tmp

    return removed_lines

def go_with_removed_units(line: str) -> int:
    '''
    Removes each unit from the line and searches each
    case for the best result.
    Returns the length of the smallest result.
    '''
    removed_lines = remove_units(line)
    smallest = 9999999
    for unit in removed_lines:
        size = its_go_time(removed_lines[unit])
        if size < smallest:
            smallest = size
    return smallest

assert its_go_time('aA') == 0
assert its_go_time('abBA') == 0
assert its_go_time('abAB') == 4
assert its_go_time('aabAAB') == 6
assert its_go_time('dabAcCaCBAcCcaDA') == 10

assert go_with_removed_units('dabAcCaCBAcCcaDA') == 4

print(go_with_removed_units(line))
# 5844