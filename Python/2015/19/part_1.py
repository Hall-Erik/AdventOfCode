def count_distinct(rules:list, mol:str) -> int:
    molecules = []
    for rule in [r.split(' ') for r in rules]:
        i = mol.find(rule[0])
        while(i != -1):
            molecules.append(mol[:i] + rule[2] + mol[i+len(rule[0]):])
            i = mol.find(rule[0], i+1)
    return len(set(molecules))

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        lines = f.readlines()
    
    lines = [line.replace('\n', '') for line in lines]
    distinct = count_distinct(lines[:-2], lines[-1])
    print(f'{distinct} molecules can be created.')
    
    test_input = [
        'H => HO',
        'H => OH',
        'O => HH',
        '',
        'HOH'
    ]
    assert count_distinct(test_input[:-2], test_input[-1]) == 4
    assert count_distinct(test_input[:-2], 'HOHOHO') == 7