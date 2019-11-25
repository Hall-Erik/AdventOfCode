from tqdm import tqdm

lights = {}
size = 100

def count_on_neighbors(pos:tuple) -> int:
    min_x = pos[0] - 1
    min_y = pos[1] - 1
    max_x = pos[0] + 2
    max_y = pos[1] + 2
    return [
        lights.get((x, y), '.')
        for x in range(min_x, max_x)
        for y in range(min_y, max_y)
        if (x, y) != pos].count('#')

def get_light_next_state(pos:tuple) -> str:
    if count_on_neighbors(pos) == 3:
        return '#'
    if lights.get(pos, '.')  == '#' and count_on_neighbors(pos) == 2:
        return '#'
    return '.'

def run_step() -> list:
    return {
        (x, y): '#'
        for y in range(size)
        for x in range(size)
        if get_light_next_state((x, y)) == '#'
    }

def count_on_lights() -> int:
    return list(lights.values()).count('#')

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        light_lines = f.readlines()
    
    lights = {
        (x, y): c
        for y, r in enumerate(light_lines)
        for x, c in enumerate(list(r.replace('\n', '')))
    }
    for i in tqdm(range(100)):
        lights = run_step()
    
    print(f'Light on after 100 iterations: {count_on_lights()}')

    test_lights = { 
        (x, y): c    
        for y, r in enumerate([
        '.#.#.#',
        '...##.',
        '#....#',
        '..#...',
        '#.#..#',
        '####..'])
        for x, c in enumerate(list(r))
        if c == '#'
    }
    lights = test_lights
    size = 6

    # Test counting neighbors
    assert count_on_neighbors((0,0)) == 1
    assert count_on_neighbors((4,0)) == 4
    assert count_on_neighbors((3,2)) == 3

    # Test rules
    assert get_light_next_state((0,0)) == '.'
    assert get_light_next_state((1,0)) == '.'
    assert get_light_next_state((2,0)) == '#'

    for i in range(4):
        lights = run_step()
    
    # Test count the lights
    assert count_on_lights() == 4
