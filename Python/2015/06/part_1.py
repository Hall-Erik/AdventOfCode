from tqdm import tqdm


lights = {}

def get_range(i: str, mode: str) -> tuple:
    '''
    Strip the string i and return a 2d tuple of the range
    i: the instruction string to convert
    mode: the mode part ('toggle ', 'turn on ', 'turn off ') to strip out
    'toggle 0,0 through 999,999' should return ((0,0),(999,999)).
    '''
    s = i.replace(mode, '').replace(' through ', ',').split(',')
    return (int(s[0]), int(s[1])), (int(s[2]), int(s[3]))

def run_instruction(i: str) -> None:
    if ('toggle ') in i:
        a, b = get_range(i, 'toggle ')
        for m in range(a[0], b[0]+1):
            for n in range(a[1], b[1]+1):
                lights[(m, n)] = not lights.get((m, n), False)
    if ('turn on ') in i:
        a, b = get_range(i, 'turn on ')
        for m in range(a[0], b[0]+1):
            for n in range(a[1], b[1]+1):
                lights[(m, n)] = True
    if ('turn off ') in i:
        a, b = get_range(i, 'turn off ')
        for m in range(a[0], b[0]+1):
            for n in range(a[1], b[1]+1):
                lights[(m, n)] = False

def count_lights():
    n = 0
    for l in lights:
        if lights[l]:
            n += 1
    return n


if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        instructions = f.readlines()

    for i in tqdm(instructions):
        run_instruction(i)

    print(f'{count_lights()} lights are on.')

    # Basic tests
    lights = {}
    run_instruction('turn on 0,0 through 999,999')
    assert count_lights() == 1000000
    lights = {}
    run_instruction('toggle 0,0 through 999,0')
    assert count_lights() == 1000
    lights = {}
    run_instruction('turn off 499,499 through 500,500')
    assert count_lights() == 0
