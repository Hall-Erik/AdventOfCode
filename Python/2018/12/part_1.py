rules = []
state = ''

with open('input.txt', 'r') as f:
    for line in f:
        rules.append(line.strip('\n'))

def build_rules(rules:list) -> dict:
    rule_dict = {}
    for rule in rules:
        rule_dict[rule[0:5]] = rule[-1]
    return rule_dict

def pad_state(state:str, generations:20) -> str:
    dots = '.' * generations * 2
    return dots + state + dots

def check_rules(group:str, rules:dict) -> str:
    '''
    Check the rules for a single group
    e.g. "....." -> "."
    '''
    if group in rules:
        return rules[group]
    else:
        return '.'

def run_rules(state:str, rules:dict) -> str:
    '''
    Check the state against the rules and returns
    the state for the next generation.
    '''
    tmp = list(state)
    for i in range(len(state)-4):
        group = state[i:i+5]
        tmp[i+2] = check_rules(group, rules)
    return ''.join(tmp)

def count_generations(state:str, rules:dict, generations:int=20) -> int:
    offset = 20
    state = pad_state(state, offset)

    for i in range(generations):
        if state.find('#') < 10 or len(state) - state.rfind('#') < 10:
            offset += 20
            state = pad_state(state, 20)
        state = run_rules(state, rules)
        
    total = 0
    for i in range(len(state)):
        if state[i] == '#':
            total += i-(2*offset)
    return total

test_state = '#..#.#..##......###...###'
test_rules = [
    '...## => #',
    '..#.. => #',
    '.#... => #',
    '.#.#. => #',
    '.#.## => #',
    '.##.. => #',
    '.#### => #',
    '#.#.# => #',
    '#.### => #',
    '##.#. => #',
    '##.## => #',
    '###.. => #',
    '###.# => #',
    '####. => #',
]
test_rules = build_rules(test_rules)
assert pad_state(test_state, 5) == '..........#..#.#..##......###...###..........'
assert check_rules('.....', test_rules) == '.'
assert check_rules('####.', test_rules) == '#'
assert check_rules(pad_state(test_state, 5)[8:13], test_rules) == '#'
assert check_rules(pad_state(test_state, 5)[9:14], test_rules) == '.'
test_states = [
    '....#..#.#..##......###...###............',
    '....#...#....#.....#..#..#..#............',
    '....##..##...##....#..#..#..##...........',
    '...#.#...#..#.#....#..#..#...#...........',
    '....#.#..#...#.#...#..#..##..##..........',
    '.....#...##...#.#..#..#...#...#..........',
    '.....##.#.#....#...#..##..##..##.........',
    '....#..###.#...##..#...#...#...#.........',
    '....#....##.#.#.#..##..##..##..##........',
    '....##..#..#####....#...#...#...#........',
    '...#.#..#...#.##....##..##..##..##.......',
    '....#...##...#.#...#.#...#...#...#.......',
    '....##.#.#....#.#...#.#..##..##..##......',
    '...#..###.#....#.#...#....#...#...#......',
    '...#....##.#....#.#..##...##..##..##.....',
    '...##..#..#.#....#....#..#.#...#...#.....',
    '..#.#..#...#.#...##...#...#.#..##..##....',
    '...#...##...#.#.#.#...##...#....#...#....',
    '...##.#.#....#####.#.#.#...##...##..##...',
    '..#..###.#..#.#.#######.#.#.#..#.#...#...',
    '..#....##....#####...#######....#.#..##..',
]
for i in range(len(test_states)-1):
    assert run_rules(test_states[i], test_rules) == test_states[i+1]

if __name__ == '__main__':
    state = rules[0][15:].strip('\n')
    rules = build_rules(rules[2:])

    print(count_generations(state, rules, 20))
    # 1917