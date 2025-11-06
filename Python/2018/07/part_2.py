from typing import List, Set
import string
from collections import Counter

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

def get_last_steps(steps: List[tuple]) -> Set[str]:
    '''
    Returns set of steps that are not proceeded by any
    others.
    '''
    first = set([l[0] for l in steps])
    second = set([l[1] for l in steps])
    return second - first

def get_job_secs(job: str, offset: int=60) -> int:
    '''
    Returns the number of seconds a job takes
    '''
    return string.ascii_uppercase.find(job) + 1 + offset


def go_time(lines: List[str], max_workers: int=5, step_offset: int=60) -> int:
    '''
    Takes in a list of raw instructions and returns
    the number of seconds it will take to complete all steps.
    '''
    steps = parse(lines)
    steps_in_order = ''
    total_seconds = 0
    last_steps = list(sorted(get_last_steps(steps)))
    workers = Counter()

    while len(steps) > 0 or len(last_steps) > 0:
        # Find availabe steps
        first_steps = list(sorted(get_first_steps(steps)))

        if len(first_steps) == 0:
            first_steps = last_steps

        # If idle workers and availabe steps, add step to a worker.
        for step in first_steps:
            if len(workers) >= max_workers: break
            if step not in workers:
                workers[step] = 0

        total_seconds += 1
        # Check on/increment workers then clear tasks if able
        for step in first_steps:
            if step in workers:
                workers[step] += 1
                if workers[step] == get_job_secs(step, step_offset):
                    del(workers[step])
                    steps_in_order += ''.join(step)
                    steps = [x for x in steps if x[0] != step]
                    last_steps = [x for x in last_steps if x != step]
                
    return total_seconds

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
assert get_last_steps(test_steps) == set('E')
assert get_job_secs('A', 0) == 1
assert get_job_secs('Z', 60) == 86
assert get_job_secs('Z') == 86
assert go_time(test_lines, 2, 0) == 15

print(go_time(lines))