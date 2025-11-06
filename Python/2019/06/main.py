def check_map(orbit_map:dict) -> int:
    count = 0
    for m in orbit_map:
        count += 1
        parent = orbit_map[m]
        while parent != 'COM':
            parent = orbit_map[parent]
            count += 1
    return count

def find_path(orbit_map:dict) -> int:
    you = []
    san = []
    p = orbit_map['YOU']
    while p != 'COM':
        you.append(p)
        p = orbit_map[p]
    p = orbit_map['SAN']
    while p != 'COM':
        san.append(p)
        p = orbit_map[p]
    count = 0
    for p in you:
        if p in san: break
        count += 1
    for p in san:
        if p in you: break
        count += 1
    return count

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        uom = f.readlines()
    uom = [m.replace('\n', '').split(')') for m in uom]
    uom = {m[1]: m[0] for m in uom}

    print(f'Checksum: {check_map(uom)}')
    print(f'Minimun Xfers: {find_path(uom)}')

    # Tests
    test_map = [
        'COM)B',
        'B)C',
        'C)D',
        'D)E',
        'E)F',
        'B)G',
        'G)H',
        'D)I',
        'E)J',
        'J)K',
        'K)L']
    test_map = {m.split(')')[1]: m.split(')')[0] for m in test_map}
    assert check_map(test_map) == 42

    test_map = [
        'COM)B',
        'B)C',
        'C)D',
        'D)E',
        'E)F',
        'B)G',
        'G)H',
        'D)I',
        'E)J',
        'J)K',
        'K)L',
        'K)YOU',
        'I)SAN']
    test_map = {m.split(')')[1]: m.split(')')[0] for m in test_map}
    assert find_path(test_map) == 4
