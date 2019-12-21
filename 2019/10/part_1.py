def dictify(map_list:list) -> dict:
    '''
    Takes a list of strings representing a map
    where # is an asteriod.
    Returns a dict where the key is (x,y) - the
    position on the map and the value is #.
    '''
    map_dict = {}
    for row in range(len(map_list)):
        for col, char in enumerate(map_list[row]):
            if char == '#':
                map_dict[(col, row)] = '#'
    return map_dict

def count_visible(map_dict:dict, position:tuple) -> int:
    '''Counts visible asteroids from a given asteroid position'''
    positions = [p for p in map_dict if p != position]
    slopes = []
    for p in positions:
        rise = p[1] - position[1]
        run = p[0] - position[0]
        if run == 0:
            if rise > 0:
                slopes.append('y+')
            elif rise < 0:
                slopes.append('y-')
        elif rise == 0:
            if run > 0:
                slopes.append('x+')
            elif run < 0:
                slopes.append('x-')
        else:
            if rise > 0 and run > 0: quad = 1
            elif rise > 0 and run < 0: quad = 4
            elif rise < 0 and run > 0: quad = 2
            else: quad = 3
            slopes.append((quad, rise/run))
    slopes = set(slopes)
    return len(slopes)

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        map_list = f.readlines()
    map_list = [row.replace('\n', '') for row in map_list]
    map_dict = dictify(map_list)
    print(max([count_visible(map_dict, p) for p in map_dict]))

    test_map = [
        '.#..#',
        '.....',
        '#####',
        '....#',
        '...##']
    test_dict = dictify(test_map)
    assert max([count_visible(test_dict, p) for p in test_dict]) == 8

    test_map = [
        '......#.#.',
        '#..#.#....',
        '..#######.',
        '.#.#.###..',
        '.#..#.....',
        '..#....#.#',
        '#..#....#.',
        '.##.#..###',
        '##...#..#.',
        '.#....####']
    test_dict = dictify(test_map)
    assert max([count_visible(test_dict, p) for p in test_dict]) == 33

    test_map = [
        '#.#...#.#.',
        '.###....#.',
        '.#....#...',
        '##.#.#.#.#',
        '....#.#.#.',
        '.##..###.#',
        '..#...##..',
        '..##....##',
        '......#...',
        '.####.###.',

    ]
    test_dict = dictify(test_map)
    assert max([count_visible(test_dict, p) for p in test_dict]) == 35
    
    test_map = [
        '.#..#..###',
        '####.###.#',
        '....###.#.',
        '..###.##.#',
        '##.##.#.#.',
        '....###..#',
        '..#.#..#.#',
        '#..#.#.###',
        '.##...##.#',
        '.....#.#..',
    ]
    test_dict = dictify(test_map)
    assert max([count_visible(test_dict, p) for p in test_dict]) == 41

    test_map = [
        '.#..##.###...#######',
        '##.############..##.',
        '.#.######.########.#',
        '.###.#######.####.#.',
        '#####.##.#.##.###.##',
        '..#####..#.#########',
        '####################',
        '#.####....###.#.#.##',
        '##.#################',
        '#####.##.###..####..',
        '..######..##.#######',
        '####.##.####...##..#',
        '.#####..#.######.###',
        '##...#.##########...',
        '#.##########.#######',
        '.####.#.###.###.#.##',
        '....##.##.###..#####',
        '.#.#.###########.###',
        '#.#.#.#####.####.###',
        '###.##.####.##.#..##',
    ]
    test_dict = dictify(test_map)
    assert max([count_visible(test_dict, p) for p in test_dict]) == 210
