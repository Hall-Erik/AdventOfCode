from itertools import combinations
from functools import reduce

def find_groups(presents:list, num_groups:int=3):
    group_size = sum(presents)//num_groups
    configs = set()
    for n in range(2, len(presents)):
        groups = combinations(presents, n)
        for g in groups:
            if sum(g) != group_size: continue
            qe = reduce(lambda x, y: x * y, g)
            configs.add((len(g), qe))
        if len(configs) > 0: break
    fewest = min(configs, key=lambda x: x[0])
    return min([c for c in configs if c[0] == fewest[0]], key=lambda x: x[1])

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    
    lines = [int(l.replace('\n', '')) for l in lines]
    print(f'QE of smallest group: {find_groups(lines)}')

    print(f'QE of smallest group (out of 4): {find_groups(lines, 4)}')

    test_presents = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]
    assert find_groups(test_presents)[1] == 99
