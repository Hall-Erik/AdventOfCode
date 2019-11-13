from collections import Counter
lines = []

with open('input.txt', 'r') as f:
    lines = f.readlines()

def get_off_by_one_id(ids: list) -> str:
    leftovers = Counter()
    
    for line in ids:
        for i in range(0, len(line)):
            leftovers[line[:i] + '_' + line[i+1:]] += 1
    
    return leftovers.most_common()[0][0].replace('_', '')

assert get_off_by_one_id([
    'abcde',
    'fghij',
    'klmno',
    'pqrst',
    'fguij',
    'axcye',
    'wvxyz'
]) == 'fgij'

print(get_off_by_one_id(lines))