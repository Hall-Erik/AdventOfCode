lines = []

with open('input.txt', 'r') as f:
    lines = f.readlines()

def get_checksum(ids: list) -> dict:
    '''
    Run through box IDs and get the checksum
    '''
    grand_total = {
        2: 0,
        3: 0
    }
    for line in ids:
        chars = list(set(line))
        two = False
        three = False
        for char in chars:
            count = line.count(char)
            if count == 3:
                three = True
            elif count == 2:
                two = True
        if two:
            grand_total[2] = grand_total[2] + 1
        if three:
            grand_total[3] = grand_total[3] + 1
    return grand_total

assert get_checksum([
    'abcdef',
    'bababc',
    'abbcde',
    'abcccd',
    'aabcdd',
    'abcdee',
    'ababab']) == {
        2: 4,
        3: 3
    }
assert get_checksum([]) == {2:0, 3:0}

gt = get_checksum(lines)
print(gt)
print('Sum = {}'.format(gt[2] * gt[3]))