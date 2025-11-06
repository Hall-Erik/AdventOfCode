from test import test_lines
from list_input import list_lines


if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        strings = f.readlines()
    
    strings = [line.replace('\n', '') for line in strings]

    literals = 0
    mem = 0

    for i in range(len(list_lines)):
        literals += len(strings[i])
        mem += len(list_lines[i])

    print(f'literals: {literals}\nmem: {mem}\ntotal: {literals-mem}')

    # Test
    with open('test.txt', 'r') as f:
        test_strings = f.readlines()

    test_strings = [line.replace('\n', '') for line in test_strings]

    literals = 0
    mem = 0

    for i in range(len(test_lines)):
        literals += len(test_strings[i])
        mem += len(test_lines[i])

    assert literals - mem == 12
