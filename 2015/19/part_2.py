import re

def count_steps(rules:dict, mol:str) -> int:
    step = 0
    while mol != 'e':
        mol = re.sub('|'.join(rules.keys()), lambda x: rules[x.group()], mol, 1)
        step += 1
    return step

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    
    lines = [line.replace('\n', '') for line in lines]
    rules = {
        rule[2][::-1]: rule[0][::-1]
        for rule in
        sorted([r.split(' ') for r in lines[:-2]], key=lambda x: -len(x[2]))
    }
    steps = count_steps(rules, lines[-1][::-1])
    print(f'Molecule created after {steps} steps.')
