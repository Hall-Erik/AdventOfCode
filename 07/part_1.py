from typing import List, Set

lines = [] # Raw input form instructions

with open('input.txt', 'r') as f:
    lines = f.readlines()

def parse(lines: List[str]) -> List[tuple]:
    '''
    Reads in a list of instructions and
    returns a list of tuples where the first
    element is the preceeding step and the 
    second element is the proceeding step.
    e.g. "Step C must be finished before step F can begin."
    becomes ("C", "F").
    '''
    steps = []
    for line in lines:
        steps.append((line[5], line[36]))
    return steps

def get_first_steps(steps: List[tuple]) -> Set[str]:
    '''
    Returns a set of steps that are not preceeded by any
    other steps.
    '''
    first = set([l[0] for l in steps])
    second = set([l[1] for l in steps])
    return first - second

def go_time(lines: List[str]) -> str:
    '''
    Takes in a list of raw instructions and returns
    a string containing the steps in the proper order.
    '''
    steps = parse(lines)
    steps_in_order = ''
    while len(steps) > 0:
        first_steps = get_first_steps(steps)
        first_step = list(sorted(first_steps))[0]
        steps_in_order += ''.join(first_step)
        if len(steps) == 1:
            steps_in_order += ''.join(
                sorted(set([x[1] for x in steps])))
        old_steps = [
            (x[0], x[1])
            for x in steps
            if x[0] == first_step]
        steps = [x for x in steps if x not in old_steps]
    return steps_in_order

test_lines = [
    'Step C must be finished before step F can begin.',
    'Step C must be finished before step A can begin.',
    'Step A must be finished before step B can begin.',
    'Step A must be finished before step D can begin.',
    'Step B must be finished before step E can begin.',
    'Step D must be finished before step E can begin.',
    'Step F must be finished before step E can begin.']
test_steps = [
    ('C', 'F'),
    ('C', 'A'),
    ('A', 'B'),
    ('A', 'D'),
    ('B', 'E'),
    ('D', 'E'),
    ('F', 'E')]

assert parse(test_lines) == test_steps
assert get_first_steps(test_steps) == set('C')
assert go_time(test_lines) == 'CABDFE'

print(go_time(lines))
# BHMOTUFLCPQKWINZVRXAJDSYEG