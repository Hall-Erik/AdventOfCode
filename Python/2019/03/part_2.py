directions = {
    'R': lambda x, y: map(sum, zip((x, y), (1, 0))),
    'L': lambda x, y: map(sum, zip((x, y), (-1, 0))),
    'U': lambda x, y: map(sum, zip((x, y), (0, 1))),
    'D': lambda x, y: map(sum, zip((x, y), (0, -1)))
}

def get_nearest_intersection(wires:list) -> int:
    positions = {
        0: {},
        1: {}
    }
    for i, wire in enumerate(wires):
        curr = (0, 0)
        steps = 0
        for path in wire:
            for _ in range(int(path[1:])):
                curr = tuple(directions[path[0]](*curr))
                steps += 1
                positions[i][curr] = steps

    intersections = set(positions[0]) & set(positions[1])
    count_steps = lambda i: positions[0][i] + positions[1][i]
    nearest = min(intersections, key=count_steps)
    return count_steps(nearest)

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        wires = f.readlines()
    
    wires = [wire.replace('\n', '').split(',') for wire in wires]
    print(f'Nearest intersection: {get_nearest_intersection(wires)} steps')

    # Tests
    test_wires = [
        ['R75','D30','R83','U83','L12','D49','R71','U7','L72'],
        ['U62','R66','U55','R34','D71','R55','D58','R83']
    ]
    assert get_nearest_intersection(test_wires) == 610

    test_wires = [
        ['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'],
        ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7']
    ]
    assert get_nearest_intersection(test_wires) == 410