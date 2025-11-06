from collections import Counter

registers = Counter({'a': 0, 'b': 0})

def run_program(lines:list) -> None:
    i = 0
    while True:
        if i < 0 or i >= len(lines):
            break
        inst = lines[i].replace(',', '').split(' ')

        if inst[0] == 'hlf':
            registers[inst[1]] /= 2
            i += 1
        elif inst[0] == 'tpl':
            registers[inst[1]] *= 3
            i += 1
        elif inst[0] == 'inc':
            registers[inst[1]] += 1
            i += 1
        elif inst[0] == 'jmp':
            i += int(inst[1])
        elif inst[0] == 'jie':
            i += int(inst[2]) if registers[inst[1]] % 2 == 0 else 1
        elif inst[0] == 'jio':
            i += int(inst[2]) if registers[inst[1]] == 1 else 1
        else:
            break

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    
    lines = [l.replace('\n', '') for l in lines]
    run_program(lines)
    print(f'Register b is {registers["b"]}')

    registers = Counter({'a': 1, 'b': 0})
    run_program(lines)
    print(f'Register b is {registers["b"]} when set to 1 before starting')

    # test
    registers = Counter({'a': 0, 'b': 0})
    lines = [
        'inc a',
        'jio a, +2',
        'tpl a',
        'inc a']
    run_program(lines)
    assert registers['a'] == 2
    assert registers['b'] == 0
