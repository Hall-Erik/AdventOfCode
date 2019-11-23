from itertools import combinations

def count_combos(containers:list, liters:int) -> int:
    '''How many combos with all containers'''
    return len(list(filter(lambda s: s == liters, [
        sum(c) 
        for r in range(1, len(containers)+1)
        for c in combinations(containers, r) 
    ])))

def minimize_containers(containers: list, liters:int) -> int:
    '''How many combos with the minimum amount of containers'''
    for r in range(1, len(containers) +1):
        combos = len(list(filter(lambda s: s == liters,[
            sum(c) for c in combinations(containers, r)
        ])))
        if combos > 0:
            return combos
    return 0

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        containers = f.readlines()
    
    containers = [int(c) for c in containers]
    print(f'Possible combos: {count_combos(containers, 150)}')
    print(f'Minimal combos: {minimize_containers(containers, 150)}')

    # Test
    test_containers = [20, 15, 10, 5, 5]
    assert count_combos(test_containers, 25) == 4
    assert minimize_containers(test_containers, 25) == 3