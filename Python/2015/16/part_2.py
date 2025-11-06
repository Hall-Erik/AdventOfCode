MFCSAM = {
    'children': 3,
    'cats': 7,
    'samoyeds': 2,
    'pomeranians': 3,
    'akitas': 0,
    'vizslas': 0,
    'goldfish': 5,
    'trees': 3,
    'cars': 2,
    'perfumes': 1
}

def objectify(sues:list) -> dict:
    '''returns a dictionary of aunts Sue'''
    return [
        {   
            'number': int(sue[1]),
            sue[2]: int(sue[3]),
            sue[4]: int(sue[5]),
            sue[6]: int(sue[7])
        }
        for sue in map(
            lambda s: s.replace(':', '').replace(',', '').replace('\n', '').split(' '),
            sues)
    ]

def check_sue(sue:dict) -> bool:
    for k in sue:
        if k == 'number': continue
        if k in ['cats', 'trees']:
            if not sue[k] > MFCSAM[k]: return False
        elif k in ['pomeranians', 'goldfish']:
            if not sue[k] < MFCSAM[k]: return False
        elif sue[k] != MFCSAM[k]:
            return False
    return True

def check_sues(sues:dict) -> dict:
    return filter(check_sue, sues)

if __name__ == '__main__':
    with open('input.txt', 'r') as f:
        aunts_sue = f.readlines()
    
    print('Matching Sues: ')
    for s in list(check_sues(objectify(aunts_sue))):
        print(s)
    